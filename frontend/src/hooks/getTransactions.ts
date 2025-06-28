import { useReadContract } from "wagmi";
import { readContract } from "wagmi/actions";
import { multiSigWallet } from "@/lib/multisig";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/config/rainbowkit";

export const useGetTransactions = () => {
    const { data: transactionCount } = useReadContract({
        address: multiSigWallet.address as `0x${string}`,
        abi: multiSigWallet.abi,
        functionName: "getTransactionCount",
        args: [],
    });


    return useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const transactions = [];
            if (!transactionCount) return [];
            for (let i = 0; i < Number(transactionCount); i++) {
                const transaction = await readContract(config,{
                    address: multiSigWallet.address as `0x${string}`,
                    abi: multiSigWallet.abi,
                    functionName: "transactions",
                    args: [i],
                });
                transactions.push(transaction);
            }
            return transactions;
        },
        enabled: !!transactionCount,
        refetchInterval: 1000,
    });
}