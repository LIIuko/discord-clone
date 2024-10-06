import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ServerSection } from "./server-section";
import { ServerMember } from "./server-member";

interface ServerChannelsSidebarProps {
	serverId: string
}


export const ServerMembersSidebar = async ({serverId} : ServerChannelsSidebarProps) => {
	const profile = await currentProfile();

	if(!profile) {
		redirect("/");
	}

	const server = await db.server.findUnique({
		where: {
			id: serverId,
		},
		include: {
			members:{
				include:{
					profile: true,
				},
				orderBy: {
					role: "asc",
				}
			}
		}
	})
	const members = server?.members;

	if(!server){
		return redirect("/");
	}

	const role = server.members.find((member) => member.profileId === profile.id)?.role;
	
	return(
		<div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
			<ScrollArea className="flex-1 px-3 py-2">
				{!!members?.length && (
					<div className="mb-2">
						<ServerSection
							sectionType="members"
							role={role}
							label="Members"
							server={server}
						/>
						<div className="space-y-[2px]">
							{members.map((member) => (
								<ServerMember
									key={member.id}
									member={member}
									server={server}
								/>
							))}
						</div>
					</div>
				)}
			</ScrollArea>
		</div>
	)
}