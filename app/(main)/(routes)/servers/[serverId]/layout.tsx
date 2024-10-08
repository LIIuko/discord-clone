import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ServerChannelsSidebar } from "@/components/server/server-channels-sidebar";
import { ServerMembersSidebar } from "@/components/server/server-members-sidebar";

const ServerIdLayout = async ({ 
	children,
	params, 
}: { 
	children: React.ReactNode;
	params: {serverId: string}
}) => {
	const profile = await currentProfile();

	if(!profile){
		return auth().redirectToSignIn();
	}

	const server = await db.server.findUnique({
		where: {
			id: params.serverId,
			members:{
				some:{
					profileId: profile.id
				}
			}
		}
	})

	if(!server){
		return redirect("/");
	}

  return(
		<div className="h-full">
			<div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
				<ServerChannelsSidebar serverId={params.serverId}/>
			</div>
			<div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 right-0">
        <ServerMembersSidebar serverId={params.serverId} />
      </div>
			<main className="h-full md:px-60">
				{children}
			</main>
		</div>
	);
};

export default ServerIdLayout;
