export const SALT_LENGTH = 10;

export const STATUS_CODE = {
  ERROR: 0,
  SUCCESS: 1,
  INVALID_TOKEN: 1000,
};

export const RESPONSE_STATUS = {
  SUCCESS: 200,
  SUCCESS_CREATED: 201,
  SUCCESS_NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  INTERNAL_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  ALREADY_EXISTS: 409,
  PCP_CONSTRAINT: 400,
};

export const ERROR_TYPE = {
  NOT_FOUND: 'NotFoundError',
  UNAUTHORIZED: 'UnauthorizeError',
  INTERNAL: 'InternalError',
  INTERNAL_SERVER_ERROR: 'InternalServerError',
  BAD_REQUEST: 'BadRequestError',
  FORBIDDEN: 'ForbiddenError',
  NOT_IMPLEMENTED: 'NotImplementedError',
  ALREADY_EXISTS: 'AlreadyExistsError',
  NOT_ALLOWED: 'MethodNotAllowedError',
  PCP_CONSTRAINT: 'PcpConstraintError'
};

export const USER_ROLE = {
  PrimaryCareGiver: 'Primary Care Giver',
  CareGiver: 'Care Giver',
  CareReciepent: 'Care Reciepent',
  Supporter: 'Supporter',
  Admin: 'Admin',
  SuperAdmin: 'Super Admin',
  CareLeader: 'Care Leader',
  CareCounsellor: 'Care Counsellor',
  BackendStaff: 'Backend Staff',
};

export const PAGINATORS = {
PAGINATION_START_PAGE : '1',
PAGINATION_START_MAX_LIMIT : '1000',
PAGINATION_DEFAULT_ORDER : 'ASC',
ISENABLED_TRUE : '1',
ISENABLED_FALSE : '0',
ISACTIVE_TRUE : '1',
ISACTIVE_FALSE : '0'
}