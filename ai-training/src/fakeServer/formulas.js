import data from './db.json'

const formulas = {
  // write covariance formula assumes matrix is array of arrays
  // X and Y are the number of the columns you want to get covariance of
  // dataset = [ [data data data], [data data data]] each array would be a column
  'covFunc': (X, Y) => {
    if (X.length != Y.length) return 'error mismatch length'
    var Xsum = 0;
    var Ysum = 0;
    for (let i = 0; i < X.length; i++) {
      Xsum += X[i]
      Ysum += Y[i]
    }
    const Xmean = Xsum / X.length
    const Ymean = Ysum / Y.length
    var numerator = 0
    for (let i = 0; i < X.length; i++) {
      numerator += (X[i] - Xmean) * (Y[i] - Ymean)
    }
    return numerator / (X.length - 1)
  },
  // covariance matrix formula
  'covMat': (data) => {
    let matrix = []
    for (let i = 0; i < data[0].length; i++) {
      let array = []
      for (let j = 0; j < data[0].length; j++) {
        if (j < i) array.push(matrix[j][i])
        else {
          let X = []
          let Y = []
          for (let k = 0; k < data.length; k++) {
            X.push(data[k][i])
            Y.push(data[k][j])
          }
          array.push(formulas.covFunc(X, Y))
        }
      }
      matrix.push(array)
    }
    return matrix
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