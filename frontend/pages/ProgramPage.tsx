import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProgramSection } from "../components/ProgramSection";

export function ProgramPage() {
  const [searchParams] = useSearchParams();
  const [initialTab, setInitialTab] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && (tab === "academic" || tab === "creative")) {
      setInitialTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <ProgramSection initialTab={initialTab} />
    </div>
  );
}