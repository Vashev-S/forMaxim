export interface EventInterface {
  id: string;
  type: string;
  outageType: string;
  scheduleType: string;
  service: string;
  instance: string;
  owner: string;
  assignment_group: string;
  description: string;
  summary: string;
  details: string;
  impact: string;
  start: Date;
  end: Date;
  recipients: string;
  state: string;
  business_unit: string;
  sys_id?: string;
}
