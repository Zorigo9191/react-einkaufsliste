import { CheckCircle2Icon, Trash2Icon, Undo2Icon } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Product = {
  name: string;
  quantity: number;
  bought: boolean;
};

const LOCAL_STORAGE_KEY = "einkaufsliste";

function App() {
  const [productQuantity, setProductQuantity] = useState(1);
  const [producName, setProductName] = useState("");

  const [list, setList] = useState<Product[]>([]);

  // const [list, setList] = useState<Product[]>(() => {
  //   if (typeof window !== "undefined") {
  //     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  //     return saved ? JSON.parse(saved) : [];
  //   }
  //   return [];
  // });

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  // }, [list]);

  const dataLoaded = useRef(false);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"));
    dataLoaded.current = true;
  }, []);

  useEffect(() => {
    if (dataLoaded.current)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-semibold mt-16 mb-10">Einkaufsliste</h1>
      <div className="flex w-full gap-2">
        <Input
          placeholder="Produkt eingeben..."
          value={producName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          type="number"
          className="w-14"
          value={productQuantity}
          onChange={(e) => setProductQuantity(Number(e.target.value))}
        />
      </div>
      <Button
        size={"lg"}
        className="w-full mt-2"
        disabled={producName.length < 1}
        onClick={() => {
          if (list.find((item) => item.name === producName)) {
            toast.error("Hinzufügen fehlgeschlagen", {
              description:
                "Das Produkt ist bereits in der Einkaufsliste vorhanden!",
            });
          } else {
            setList([
              { name: producName, quantity: productQuantity, bought: false },
              ...list,
            ]);
            setProductQuantity(1);
            setProductName("");
          }
        }}
      >
        Eintrag hinzufügen
      </Button>

      <div className="flex flex-col w-full gap-2 mt-6">
        {list.map((item) => (
          <div
            className="rounded-xl border bg-card text-card-foreground shadow p-6 flex justify-between items-center "
            key={item.name}
          >
            <div>
              <h3
                className={`text-lg font-semibold ${item.bought ? "text-muted-foreground line-through" : ""}`}
              >
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Anzahl: {item.quantity}
              </p>
            </div>

            {item.bought ? (
              <div className="flex gap-2">
                <Button
                  variant={"destructive"}
                  size={"icon"}
                  onClick={() => {
                    setList([
                      ...list.filter((listItem) => listItem.name !== item.name),
                    ]);
                    toast.info("Produkt gelöscht", {
                      description:
                        item.name + " wurde aus der Einkaufsliste entfernt.",
                    });
                  }}
                >
                  <Trash2Icon />
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setList([
                      {
                        name: item.name,
                        quantity: item.quantity,
                        bought: false,
                      },
                      ...list.filter((listItem) => listItem.name !== item.name),
                    ]);
                  }}
                >
                  <Undo2Icon />
                  Zurück
                </Button>
              </div>
            ) : (
              <Button
                size={"lg"}
                variant={"outline"}
                onClick={() => {
                  setList([
                    ...list.filter((listItem) => listItem.name !== item.name),
                    {
                      name: item.name,
                      quantity: item.quantity,
                      bought: true,
                    },
                  ]);
                }}
              >
                <CheckCircle2Icon />
                Abhaken
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
