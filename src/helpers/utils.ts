  export const getString = (keyword:string|string[]|undefined) : string => {

      if (Array.isArray(keyword)) {
          return keyword.join(",")
      }

      return keyword?.toString() ?? ""
  }

  