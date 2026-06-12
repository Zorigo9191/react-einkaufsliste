import { toast } from "sonner";

// 1. Erfolg (Grün)
toast.success("Erfolgreich!", { description: "Die Aktion war erfolgreich." });

// 2. Fehler (Rot)
toast.error("Fehler!", { description: "Etwas ist schiefgelaufen." });

// 3. Info (Blau)
toast.info("Info", { description: "Hier ist eine wichtige Information." });

// 4. Warnung (Gelb)
toast.warning("Warnung!", { description: "Das solltest du beachten." });
