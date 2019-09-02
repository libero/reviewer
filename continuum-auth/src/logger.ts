import * as pino from 'pino';

const Logger = pino();

export const InfraLogger = Logger.child({realm: "infra"});
export const DomainLogger = Logger.child({realm: "domain"});

export default Logger;
