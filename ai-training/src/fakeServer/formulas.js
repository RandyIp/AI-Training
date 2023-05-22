import data from './db.json'

const formulas = {
  // write covariance formula assumes matrix is array of arrays
  // X and Y are the number of the columns you want to get covariance of
  'covFunc': (X, Y, dataSet) => {
    var Xsum = 0;
    var Ysum = 0;
    for (let i = 0; i < dataSet[0].length; i++) {
      Xsum += dataSet[X][i]
      Ysum += dataSet[Y][i]
    }
    const Xmean = Xsum / dataSet[0].length
    const Ymean = Ysum / dataSet[0].length
    var numerator = 0
    for (let i = 0; i < dataSet[0].length; i++) {

    }
  },
  // covariance matrix formula
  'covMat': (X) => {

  },
  // eigenvalues and vectors
  'eigen': (X) => {

  },
  // projection matrix for future use?
  'projection': (X) => {

  }
}


// write covariance matrix formula
export default formulas