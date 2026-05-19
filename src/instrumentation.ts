export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureSeedAdmin } = await import("@/lib/seedAdmin");

    await ensureSeedAdmin();
  }
}
