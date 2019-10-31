module.exports = {
  verbose: true,
  "transform": {
      "^.+\\.ts?$": "ts-jest"
   },
   globals: {
       'ts-jest': {
         	diagnostics: false
       }
    }
};