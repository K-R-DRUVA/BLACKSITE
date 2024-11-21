import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  PieChart,
  CreditCard,
  Wallet,
  Target,
  FileText,
  TrendingUp,
  TrendingDown,
  LogOut,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    recentTransactions: [],
    spendingData: [],
    monthlySpendingData: [],
    summary: {
      totalIncome: 0,
      totalExpenses: 0,
      totalBalance: 0,
      totalSavings: 0,
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        const transformedTransactions = data.recentTransactions.map((tx) => ({
          ...tx,
          date: new Date(tx.date).toLocaleDateString(),
          amount: parseFloat(tx.amount),
        }));

        setDashboardData({
          ...data,
          recentTransactions: transformedTransactions,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-xl text-gray-100">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <aside className="w-60 bg-gray-800 p-4">
        <div className="flex items-center mt-2 ml-2 mb-5">
          <DollarSign className="h-8 w-8 text-green-500 mr-2" />
          <h1 className="text-2xl font-bold">BlackSite</h1>
        </div>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start bg-gray-700 rounded-md hover:bg-gray-600"
            onClick={() => router.push("/")}
          >
            <PieChart className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-md hover:bg-gray-600"
            onClick={() => router.push("/transactions")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Transactions
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-md hover:bg-gray-600"
            onClick={() => router.push("/goals")}
          >
            <Target className="mr-2 h-4 w-4" />
            Goals
          </Button>
          <div className="flex fixed bottom-7 w-60 left-0 right-0 px-4">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-md bg-gray-700 hover:bg-gray-600 px-7 py-5 text-center"
              onClick={() => router.push("/login")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${parseFloat(dashboardData.summary.totalBalance).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${parseFloat(dashboardData.summary.totalIncome).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${parseFloat(dashboardData.summary.totalExpenses).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <Wallet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${parseFloat(dashboardData.summary.totalSavings).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="mt-8">
          <TabsList className="bg-gray-800">
            <TabsTrigger
              value="overview"
              className="px-4 py-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-green-500"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="px-4 py-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-green-500"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="px-4 py-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-green-500"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription className="text-gray-400">
                  Your latest financial activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.recentTransactions.map(
                      (transaction, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell
                            className={`text-right ${
                              transaction.amount > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            ${Math.abs(transaction.amount).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your expense distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.spendingData}>
                      <XAxis
                        dataKey="category"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Bar
                        dataKey="amount"
                        fill="#adfa1d"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Monthly Spending Trend</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your spending over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.monthlySpendingData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Bar
                        dataKey="amount"
                        fill="#2563eb"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription className="text-gray-400">
                  Summary of your financial reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">Monthly Summary</h3>
                        <p className="text-sm text-gray-400">April 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
                      <div>
                        <h3 className="font-semibold">Income Report</h3>
                        <p className="text-sm text-gray-400">Last 3 months</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <TrendingDown className="h-6 w-6 mr-2 text-red-500" />
                      <div>
                        <h3 className="font-semibold">Expense Analysis</h3>
                        <p className="text-sm text-gray-400">Year to date</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
