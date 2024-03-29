import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

//-----------------------------------------------------------------------
// Utils.ts is the file inwhich all adhock helper methods are defined on
// a gloabl level. These methods are made available throughout the app by
// importing the requied function. The convention is to define the function
// with Upper-Camel case and export each function by default. Functions are
// ordered aplhabetically.
//-----------------------------------------------------------------------

// CreateTimestampNow creates a google protobuf Timestamp for current time
export function CreateTimestampNow(): Timestamp {
  // Create a new Timestamp object.
  const timestamp = new Timestamp();

  // Set the Timestamp to the current time.
  // JavaScript's Date.now() returns the time in milliseconds since the epoch,
  // but Timestamp expects seconds and nanoseconds, so we convert accordingly.
  const now = Date.now();
  const seconds = Math.floor(now / 1000);
  const nanos = (now % 1000) * 1000000; // Convert milliseconds to nanoseconds
  timestamp.setSeconds(seconds);
  timestamp.setNanos(nanos);

  return timestamp;
}

//DownloadBlob downloads a set of file bytes
export function DownloadBlob(
  data: Uint8Array,
  fileName: string,
  mimeType: string,
) {
  const blob = new Blob([data], {
    type: mimeType,
  });
  const url = window.URL.createObjectURL(blob);
  DownloadURL(url, fileName);
  setTimeout(function () {
    return window.URL.revokeObjectURL(url);
  }, 1000);
}

// DownloadURL programatically downloads a URL by creating and removing a <a> html tag
export function DownloadURL(data: string, fileName: string) {
  const a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  a.remove();
}

// FormatDate generates a Timestamp date in MMMM DD, YYYY HH:MM
export function FormatDate(timestamp: Timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleDateString('en-UK', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// GenerateRandomString creates a string of length desired
export function GenerateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Compare a Google Protobuf Timestamp to the current time and categorize the difference.
 * @param timestamp - The Google Protobuf Timestamp object to be compared.
 * @returns A string indicating the time difference category:
 *   - "Today"
 *   - "Yesterday"
 *   - "2 days ago" ... "6 days ago"
 *   - "1 week ago"
 *   - "2 weeks ago ... "3 weeks ago"
 *   - "Last month"
 *   - "2 months ago" ... "12 months ago"
 *   - "Older"
 */
export function categoriseTimestamp(timestamp: Timestamp): string {
  if (!timestamp) {
    return '';
  }
  const nowDate = new Date();
  const timestampDate = new Date(timestamp.getSeconds() * 1000);

  // Set both dates to midnight to compare only the dates, not the time
  nowDate.setHours(0, 0, 0, 0);
  timestampDate.setHours(0, 0, 0, 0);

  const differenceInDays = Math.floor(
    (nowDate.getTime() - timestampDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (differenceInDays === 0) {
    const nowTime = new Date();
    const timestampTime = new Date(timestamp.getSeconds() * 1000);
    const differenceInHours = Math.floor(
      (nowTime.getTime() - timestampTime.getTime()) / (1000 * 60 * 60),
    );
    if (differenceInHours === 0) {
      const differenceInMinutes = Math.floor(
        (nowTime.getTime() - timestampTime.getTime()) / (1000 * 60),
      );
      return `${differenceInMinutes} minute${differenceInMinutes === 1 ? '' : 's'} ago`;
    } else {
      return `${differenceInHours} hour${differenceInHours === 1 ? '' : 's'} ago`;
    }
  } else if (differenceInDays === 1) {
    return 'Yesterday';
  } else if (differenceInDays <= 6) {
    return `${differenceInDays} days ago`;
  } else if (differenceInDays <= 13) {
    return '1 week ago';
  } else if (differenceInDays <= 20) {
    return '2 weeks ago';
  } else if (differenceInDays <= 27) {
    return '3 weeks ago';
  } else if (differenceInDays <= 30) {
    return 'Last month';
  } else if (differenceInDays <= 365) {
    const monthsAgo = Math.floor(differenceInDays / 30);
    return `${monthsAgo} ${monthsAgo > 1 ? 'months ago' : 'month ago'}`;
  } else {
    return 'Older';
  }
}
