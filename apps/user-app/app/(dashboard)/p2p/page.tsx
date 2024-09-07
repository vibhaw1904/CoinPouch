import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { User } from "../../../components/User";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";



interface UserType {
    id: number;
    name: string | null;
    email: string | null;
    number: string;
    password: string;  // Add other fields as necessary
  }
  
   async function getAllUsers(): Promise<UserType[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  
export default async function() {
    const users = await getAllUsers();
    const session = await getServerSession(authOptions);
    const loggedInUserId = Number(session?.user?.id);
    const otherUsers = users.filter((user) => user.id !== loggedInUserId);

    return (
        <div className="w-full flex flex-col lg:flex-row gap-8 p-4">
            {/* SendCard component */}
            <div >
                <SendCard />
            </div>

            {/* User component */}
            <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <User user={otherUsers} />
                </div>
            </div>
        </div>
    );
}
