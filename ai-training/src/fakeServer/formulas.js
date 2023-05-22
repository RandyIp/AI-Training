import data from './db.json'

const formulas = {
  // write covariance formula assumes matrix is array of arrays
  // X and Y are the number of the columns you want to get covariance of
  // dataset = [ [data data data], [data data data]] each array would be a column
  'covFunc': (X, Y, dataSet) => {
    var Xsum = 0;
    var Ysum = 0;
    for (let i = 0; i < dataSet.length; i++) {
      Xsum += dataSet[i][X]
      Ysum += dataSet[i][Y]
    }
    const Xmean = Xsum / dataSet.length
    const Ymean = Ysum / dataSet.length
    var numerator = 0
    for (let i = 0; i < dataSet.length; i++) {
      numerator += (dataSet[i][X] - Xmean) * (dataSet[i][Y] - Ymean)
    }
    return numerator / (dataSet.length - 1)
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