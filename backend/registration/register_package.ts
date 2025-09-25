import { api, APIError } from "encore.dev/api";
import { registrationDB } from "./db";

export interface RegisterPackageRequest {
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  childAge: string;
  grade?: string;
  packageType: string;
  billingCycle: "monthly" | "yearly";
}

export interface RegisterPackageResponse {
  success: boolean;
  userId: number;
  message: string;
  packageDetails: {
    packageType: string;
    billingCycle: string;
    price: string;
  };
}

// Registers a new user for a paid package
export const registerPackage = api<RegisterPackageRequest, RegisterPackageResponse>(
  { expose: true, method: "POST", path: "/register/package" },
  async (req) => {
    // Validate required fields
    if (!req.parentName || !req.childName || !req.email || !req.phone || 
        !req.childAge || !req.packageType || !req.billingCycle) {
      throw APIError.invalidArgument("Semua field wajib harus diisi");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.email)) {
      throw APIError.invalidArgument("Format email tidak valid");
    }

    // Validate phone format
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(req.phone)) {
      throw APIError.invalidArgument("Format nomor telepon tidak valid");
    }

    // Validate package type
    const validPackages = ["tk-paud", "sd-awal", "sd-atas", "prompting-ai", "ai-learning"];
    if (!validPackages.includes(req.packageType)) {
      throw APIError.invalidArgument("Jenis paket tidak valid");
    }

    // Package pricing
    const packagePricing: Record<string, { monthly: string; yearly: string }> = {
      "tk-paud": { monthly: "149000", yearly: "1490000" },
      "sd-awal": { monthly: "199000", yearly: "1990000" },
      "sd-atas": { monthly: "249000", yearly: "2490000" },
      "prompting-ai": { monthly: "299000", yearly: "2990000" },
      "ai-learning": { monthly: "349000", yearly: "3490000" }
    };

    const price = packagePricing[req.packageType][req.billingCycle];

    try {
      // Check if user exists
      const existingUser = await registrationDB.queryRow<{ id: number }>`
        SELECT id FROM users WHERE email = ${req.email}
      `;

      let userId: number;

      if (existingUser) {
        // Update existing user
        await registrationDB.exec`
          UPDATE users SET 
            parent_name = ${req.parentName},
            child_name = ${req.childName},
            phone = ${req.phone},
            child_age = ${parseInt(req.childAge)},
            grade = ${req.grade || null},
            package_type = ${req.packageType},
            registration_type = 'package',
            updated_at = NOW()
          WHERE id = ${existingUser.id}
        `;
        userId = existingUser.id;
      } else {
        // Create new user
        const result = await registrationDB.queryRow<{ id: number }>`
          INSERT INTO users (
            parent_name, 
            child_name, 
            email, 
            phone, 
            child_age, 
            grade, 
            package_type,
            registration_type,
            status
          ) VALUES (
            ${req.parentName},
            ${req.childName},
            ${req.email},
            ${req.phone},
            ${parseInt(req.childAge)},
            ${req.grade || null},
            ${req.packageType},
            'package',
            'active'
          ) RETURNING id
        `;

        if (!result) {
          throw APIError.internal("Gagal menyimpan data pendaftaran");
        }
        userId = result.id;
      }

      return {
        success: true,
        userId,
        message: "Pendaftaran paket berhasil! Tim kami akan menghubungi Anda untuk proses pembayaran.",
        packageDetails: {
          packageType: req.packageType,
          billingCycle: req.billingCycle,
          price: `Rp ${parseInt(price).toLocaleString("id-ID")}`
        }
      };
    } catch (error) {
      console.error("Package registration error:", error);
      throw APIError.internal("Terjadi kesalahan saat mendaftar paket. Silakan coba lagi.");
    }
  }
);
