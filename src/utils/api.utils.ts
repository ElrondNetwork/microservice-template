export class ApiUtils {
  static mergeObjects<T>(obj1: T, obj2: any) {
    for (const key of Object.keys(obj2)) {
      if (key in obj1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj1[key] = obj2[key];
      }
    }

    return obj1;
  }

  static cleanupApiValueRecursively<T>(obj: T) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        if (item && typeof item === 'object') {
          ApiUtils.cleanupApiValueRecursively(item);
        }
      }
    } else if (obj && typeof obj === 'object') {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' || Array.isArray(value)) {
          ApiUtils.cleanupApiValueRecursively(value);
        }

        if (value === null || value === '' || value === undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete obj[key];
        }

        if (Array.isArray(value) && value.length === 0) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete obj[key];
        }
      }
    }

    return obj;
  }

  static replaceUri(uri: string, pattern: string, replacer: string): string {
    if (uri.startsWith(pattern)) {
      return uri.replace(pattern, replacer);
    }

    return uri;
  }

}
