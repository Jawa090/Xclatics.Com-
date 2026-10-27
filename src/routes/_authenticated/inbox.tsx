import { createFileRoute } from '@tanstack/react-router';
import { queryOptions } from '@tanstack/react-query';
import { loadInbox } from '@/lib/inbox/inbox.functions';
import { InboxWorkspace } from '@/components/inbox-workspace';
import { pageHead } from '@/lib/site-content';
export const inboxOptions=queryOptions({queryKey:['shared-inbox'],queryFn:()=>loadInbox(),refetchInterval:5000});
export const Route=createFileRoute('/_authenticated/inbox')({staticData:{sitemap:false},head:()=>({...pageHead('Shared inbox','Manage Xclatix customer conversations and automatic AI replies.'),meta:[...pageHead('Shared inbox','Manage Xclatix customer conversations and automatic AI replies.').meta,{name:'robots',content:'noindex,nofollow'}]}),loader:({context})=>context.queryClient.ensureQueryData(inboxOptions),component:InboxWorkspace});