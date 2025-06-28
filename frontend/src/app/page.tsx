'use client';
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import NewTransaction from "@/components/shared/new-transaction";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGetTransactions } from "@/hooks/getTransactions";
import { Check, InfoIcon, Plus, Users } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string | null>('new');

  const { data: transactions } = useGetTransactions();
  
  console.log("🚀 ~ Home ~ transactions:", transactions);
  return (
    <div className="w-screen h-screen bg-blue-200 overflow-hidden flex flex-col items-center gap-4">
      <Header />
      <div className="w-full h-full flex items-center justify-center p-4">
        <Card className="w-full h-full flex flex-col gap-4">
          <CardHeader className="flex flex-row p-4 items-center justify-between">
            <CardTitle>Create a new transaction</CardTitle>
            <ToggleGroup type="single" className="bg-blue-200 rounded-md p-2" defaultValue="new" onValueChange={setValue}>
              <ToggleGroupItem className="flex items-center gap-2 justify-center" value="new">
                <Plus className="w-4 h-4" />
                New Public Transaction
              </ToggleGroupItem>
              <ToggleGroupItem className="flex items-center gap-2 justify-center" value="approve">
                <Check className="w-4 h-4" />
                Approve
              </ToggleGroupItem>
              <ToggleGroupItem className="flex items-center gap-2 justify-center" value="add">
                <Users className="w-4 h-4" />
                Add Citizens
              </ToggleGroupItem>
              <ToggleGroupItem className="flex items-center gap-2 justify-center" value="about">
                <InfoIcon className="w-4 h-4" />
                About
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent className="p-4 h-full w-full flex flex-col gap-4">
            {value === "new" && <NewTransaction />}
            {/* {value === "approve" && <ApproveTransaction />}
            {value === "about" && <About />} */}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
