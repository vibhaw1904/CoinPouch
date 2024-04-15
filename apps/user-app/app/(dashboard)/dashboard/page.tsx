import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"
import { User } from "../../../components/User";
import { Card } from "@repo/ui/card";
async function getAllUsers() {
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
    const users=await getAllUsers()
    const session = await getServerSession(authOptions);
    console.log(session)
    const loggedInUserId = session?.user?.id; 
    console.log(loggedInUserId)
    const otherUsers = users.filter((user) => user.id != loggedInUserId);
    console.log(otherUsers)
    return <Card title="users">
    <div className='my-2'><input className='w-full px-2 py-1 border rounded border-slate-200' placeholder='Search user' /></div>
      <div >
      {otherUsers.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </Card>
}