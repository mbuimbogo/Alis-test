export const ERR_OK = '0'; /** Not an error; returned on success. */
export const ERR_CANCELLED =
  '1'; /** The operation was cancelled, typically by the caller. */
export const ERR_UNKNOWN =
  '2'; /** Unknown error. For example, this error may be returned when a Status value received from another address space belongs to an error space that is not known in this address space. Also errors raised by APIs that do not return enough error information may be converted to this error. */
export const ERR_INVALID_ARGUMENT =
  '3'; /** The client specified an invalid argument. Note that this differs from FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are problematic regardless of the state of the system (e.g., a malformed file name). */
export const ERR_DEADLINE_EXCEEDED =
  '4'; /** The deadline expired before the operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long. */
export const ERR_NOTFOUND =
  '5'; /** Some requested entity (e.g., file or directory) was not found. Note to server developers: if a request is denied for an entire class of users, such as gradual feature rollout or undocumented allowlist, NOT_FOUND may be used. If a request is denied for some users within a class of users, such as user-based access control, PERMISSION_DENIED must be used. */
export const ERR_ALREADY_EXISTS =
  '6'; /** The entity that a client attempted to create (e.g., file or directory) already exists. */
export const ERR_PERMISSION_DENIED =
  '7'; /** The caller does not have permission to execute the specified operation. PERMISSION_DENIED must not be used for rejections caused by exhausting some resource (use RESOURCE_EXHAUSTED instead for those errors). PERMISSION_DENIED must not be used if the caller cannot be identified (use UNAUTHENTICATED instead for those errors). This error code does not imply the request is valid or the requested entity exists or satisfies other pre-conditions. */
export const ERR_RESOURCE_EXHAUSTED =
  '8'; /** Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space. */
export const ERR_FAILED_PRECONDITION =
  '9'; /** The operation was rejected because the system is not in a state required for the operation's execution. For example, the directory to be deleted is non-empty, an rmdir operation is applied to a non-directory, etc. Service implementors can use the following guidelines to decide between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE: (a) Use UNAVAILABLE if the client can retry just the failing call. (b) Use ABORTED if the client should retry at a higher level (e.g., when a client-specified test-and-set fails, indicating the client should restart a read-modify-write sequence). (c) Use FAILED_PRECONDITION if the client should not retry until the system state has been explicitly fixed. E.g., if an "rmdir" fails because the directory is non-empty, FAILED_PRECONDITION should be returned since the client should not retry unless the files are deleted from the directory. */
export const ERR_ABORTED =
  '10'; /** The operation was aborted, typically due to a concurrency issue such as a sequencer check failure or transaction abort. See the guidelines above for deciding between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE. */
export const ERR_OUT_OF_RANGE =
  '11'; /** The operation was attempted past the valid range. E.g., seeking or reading past end-of-file. Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed if the system state changes. For example, a 32-bit file system will generate INVALID_ARGUMENT if asked to read at an offset that is not in the range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from an offset past the current file size. There is a fair bit of overlap between FAILED_PRECONDITION and OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error) when it applies so that callers who are iterating through a space can easily look for an OUT_OF_RANGE error to detect when they are done. */
export const ERR_UNIMPLEMENTED =
  '12'; /** The operation is not implemented or is not supported/enabled in this service. */
export const ERR_INTERNAL =
  '13'; /** Internal errors. This means that some invariants expected by the underlying system have been broken. This error code is reserved for serious errors. */
export const ERR_UNAVAILABLE =
  '14'; /** The service is currently unavailable. This is most likely a transient condition, which can be corrected by retrying with a backoff. Note that it is not always safe to retry non-idempotent operations. */
export const ERR_DATA_LOSS = '15'; /** Unrecoverable data loss or corruption. */
export const ERR_UNAUTHENTICATED =
  '16'; /** The request does not have valid authentication credentials for the operation. */

/**
 * ErrorMessages provides a means of passing an error code, and retrieving
 * a cleaner, human-readable message which cna be displayed to the user
 *
 * Example usage:
 *    try {
 *    // Make API hit
 *   }catch (e) {
 *     console.error(e)
 *     alert(ErrorMessages[e.code].message))
 *   }
 * */
export const ErrorMessages = {
  [ERR_OK]: {
    code: ERR_OK,
    message: 'The operation completed successfully.',
  },
  [ERR_CANCELLED]: {
    code: ERR_CANCELLED,
    message: 'The operation was cancelled.',
  },
  [ERR_UNKNOWN]: {
    code: ERR_UNKNOWN,
    message: 'The cause of the error is unknown or unspecified.',
  },
  [ERR_INVALID_ARGUMENT]: {
    code: ERR_INVALID_ARGUMENT,
    message: 'The client specified an invalid argument.',
  },
  [ERR_DEADLINE_EXCEEDED]: {
    code: ERR_DEADLINE_EXCEEDED,
    message: 'The deadline for the operation expired before completion.',
  },
  [ERR_NOTFOUND]: {
    code: ERR_NOTFOUND,
    message: 'The requested resource was not found.',
  },
  [ERR_ALREADY_EXISTS]: {
    code: ERR_ALREADY_EXISTS,
    message: 'The resource being created already exists.',
  },
  [ERR_PERMISSION_DENIED]: {
    code: ERR_PERMISSION_DENIED,
    message:
      'The caller does not have permission to execute the specified operation.',
  },
  [ERR_RESOURCE_EXHAUSTED]: {
    code: ERR_RESOURCE_EXHAUSTED,
    message:
      'Some resource required for the operation to complete has been exhausted.',
  },
  [ERR_FAILED_PRECONDITION]: {
    code: ERR_FAILED_PRECONDITION,
    message:
      "The operation was rejected because the system is not in a state required for the operation's execution.",
  },
  [ERR_ABORTED]: {
    code: ERR_ABORTED,
    message: 'The operation was aborted, typically due to a concurrency issue.',
  },
  [ERR_OUT_OF_RANGE]: {
    code: ERR_OUT_OF_RANGE,
    message: 'The operation was attempted past the valid range.',
  },
  [ERR_UNIMPLEMENTED]: {
    code: ERR_UNIMPLEMENTED,
    message:
      'The method is not implemented or is not supported/enabled in this service.',
  },
  [ERR_INTERNAL]: {
    code: ERR_INTERNAL,
    message: 'An internal error occurred.',
  },
  [ERR_UNAVAILABLE]: {
    code: ERR_UNAVAILABLE,
    message: 'The service is currently unavailable.',
  },
  [ERR_DATA_LOSS]: {
    code: ERR_DATA_LOSS,
    message: 'Unrecoverable data loss or corruption occurred.',
  },
  [ERR_UNAUTHENTICATED]: {
    code: ERR_UNAUTHENTICATED,
    message: 'The request does not have valid authentication credentials.',
  },
};
