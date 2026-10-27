import { describe,it,expect } from 'vitest';
import {canAutoReply,safeEmailAddress,encodeEmail,chatInput} from '@/lib/inbox/rules';
describe('Shared inbox safeguards',()=>{
  it('sends automatic replies when enabled for a new customer inquiry',()=>{expect(canAutoReply(true,true,false,'inbound','pending')).toBe(true);expect(canAutoReply(true,true,false,'outbound','pending')).toBe(false);});
  it('does not reply after human handoff',()=>{expect(canAutoReply(true,false,false,'inbound','pending')).toBe(false);});
  it('does not repeat completed or uncertain attempts',()=>{expect(canAutoReply(true,true,false,'inbound','completed')).toBe(false);expect(canAutoReply(true,true,false,'inbound','uncertain')).toBe(false);});
  it('halts automatic replies when paused',()=>{expect(canAutoReply(true,true,true,'inbound','pending')).toBe(false);});
  it('prevents email recipient header injection',()=>{expect(()=>safeEmailAddress('person@example.com\r\nBcc: stranger@example.com')).toThrow();expect(safeEmailAddress('Customer <person@example.com>')).toBe('person@example.com');});
  it('preserves Unicode replies and marks messages automatic',()=>{const raw=encodeEmail('person@example.com','Résumé','Hello — welcome','test-id');const decoded=new TextDecoder().decode(Uint8Array.from(atob(raw.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0)));expect(decoded).toContain('Hello — welcome');expect(decoded).toContain('Auto-Submitted: auto-replied');});
  it('rejects chat without a valid private session token',()=>{expect(chatInput.safeParse({token:'guess',name:'Alex',body:'Hello',requestId:crypto.randomUUID()}).success).toBe(false);});
});