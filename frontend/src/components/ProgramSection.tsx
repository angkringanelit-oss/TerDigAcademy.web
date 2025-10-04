import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Program = {
  id: string;
  name: string;
  short_description: string;
  price: number;
  currency: string;
};

export default function ProgramSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase.from("programs").select("*").eq("is_published", true);
      if (!error && data) setPrograms(data);
      setLoading(false);
    };
    fetchPrograms();
  }, []);

  if (loading) return <p>Loading program...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {programs.map((program) => (
        <div key={program.id} className="border p-4 rounded shadow">
          <h3 className="font-bold text-lg">{program.name}</h3>
          <p>{program.short_description}</p>
          <p className="mt-2 text-blue-600">
            {program.currency} {program.price.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}