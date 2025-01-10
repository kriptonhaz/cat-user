declare global {
  interface Window {
    env: any
  }
}

export type EnvType = {
  VITE_TENTANG_KAMI: string
  VITE_HUBUNGI_KAMI: {
    email: string
    direktorat: string
    alamat: string
  }
  VITE_COPYRIGHT: string
}
export const env: EnvType = {
  ...import.meta.env,
  ...window.env,
  VITE_TENTANG_KAMI:
    "SI Te-B Kominfo adalah aplikasi yang memfasilitasi pelaporan kegiatan usaha bagi Aktivitas Pengembangan Teknologi Blockchain (KBLI 62014), Aktivitas Pemrograman Berbasis Kecerdasan Artifisial (KBLI 62015), dan Aktivitas Konsultasi dan Perancangan Internet of Things (KBLI 62024) dengan memperhatikan kemudahan dari sisi pelapor, serta mengedepankan prinsip keamanan data.",
  VITE_HUBUNGI_KAMI: {
    email: "supertb@kominfo.go.id",
    direktorat: "Direktorat Tata Kelola Aplikasi Informatika",
    alamat: "Midpoint Place lt 18, Jl. H. Fachrudin No.26, Kp. Bali, Kec. Tanah Abang, Jakarta",
  },
  VITE_COPYRIGHT: "Ditjen Aptika - Kementerian Komunikasi dan Informatika",
}
