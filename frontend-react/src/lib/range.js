export function range(start, stop) {
  return {
    [Symbol.iterator]() {
      if (stop === undefined) {
        stop = start;
        start = 0;
      }

      let i = start - 1;

      return {
        next() {
          i++;
          if (i < stop) {
            return {
              value: i,
              done: false,
            };
          }
          return {
            value: undefined,
            done: true,
          };
        },
      };
    },
  };
}
