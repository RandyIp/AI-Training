import data from './db.json'
import { SVD } from 'svd-js'
import { eigs, inv, multiply, transpose } from 'mathjs'
var svm = require("svm");
// note, mathjs reads arrays as rows, i.e.
// A = [[0, 1, 2]
// [3, 4, 5]
// [6, 7, 8]]

let svmPrototype = new svm.SVM()

const formulas = {
  // ------------------------- STANDARDIZATION & SVD -------------------------
  'standardize': (X) => {
    let Xsum = 0
    for (let i of X) Xsum += i
    const Xmean = Xsum / X.length
    let numerator = 0
    for (let i of X) numerator += (i - Xmean) ** 2
    const SD = Math.sqrt(numerator / X.length)
    let standardX = []
    for (let i of X) standardX.push((i - Xmean) / SD)
    return standardX
  },
  'sparseTransform': (sparseMatrix) => {
    let newData = [...sparseMatrix]
    for (let i = 0; i < newData.length; i++) {
      if (newData[i] == 0) newData[i] = 0.1
    }
    return newData
  },
  'truncatedSVD': (dataPoint, matrixLength, percent = 0.95) => {

    // creates the matrix from vector
    let a = []
    let i = 0
    let j = matrixLength

    while (j <= matrixLength ** 2) {
      a.push(dataPoint.slice(i, j))
      i += matrixLength
      j += matrixLength
    }

    // perform SVD
    const { u, v, q } = SVD(a)

    // sort out and calculate top eigenvalues
    let eigenvaluesSorted = [...q]
    eigenvaluesSorted.sort().reverse()
    let topEigenvalues = []
    let totalVariance = 0
    let explainedVariance = 0
    for (let i of eigenvaluesSorted) {
      totalVariance += i
    }
    for (let i of eigenvaluesSorted) {
      topEigenvalues.push(i)
      explainedVariance += i
      if (explainedVariance / totalVariance > percent) break
    }
    // create new U, V, Q
    let indexArray = []
    let newU = Array.from(Array(u.length), () => [])
    let newV = Array.from(Array(v.length), () => [])
    let newQ = []
    for (let i of topEigenvalues) {
      indexArray.push(q.indexOf(i))
    }
    for (let i = 0; i < indexArray.length; i++) {
      for (let j = 0; j < u.length; j++) {
        newU[j].push(u[j][indexArray[i]])
      }
      for (let j = 0; j < v.length; j++) {
        newV[j].push(v[j][indexArray[i]])
      }
      let tempArray = (Array(indexArray.length).fill(0))
      tempArray[i] = q[indexArray[i]]
      newQ.push(tempArray)
    }
    for (let i = 0; i < newU.length; i++) {
      if (newU[i] == undefined) newU[i] = Array(matrixLength).fill(0)
      if (newQ[i] == undefined) newQ[i] = Array(matrixLength).fill(0)
      if (newV[i] == undefined) newV[i] = Array(matrixLength).fill(0)
    }
    for (let i = 0; i < newU.length; i++) {
      for (let j = 0; j < newU.length; j++) {
        if (newU[i][j] == undefined) newU[i][j] = 0
        if (newQ[i][j] == undefined) newQ[i][j] = 0
        if (newV[i][j] == undefined) newV[i][j] = 0
      }
    }
    console.log(newU, newQ, transpose(newV))
    return (multiply(newU, newQ, transpose(newV)))
  },
  // Checking that your SVD is likely correct
  'Frobenius': (matA, matB) => {
    if (matA.length != matB.length || matA[0].length != matB[0].length) { return 'error, dimensions dont match' }
    let distance = 0
    for (let i = 0; i < matA.length; i++) {
      for (let j = 0; j < matA[0].length; j++) {
        distance += (matA[i][j] - matB[i][j]) ** 2
      }
    }
    return Math.sqrt(distance)
  },
  // ------------------------- COVARIANCE -------------------------
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
  // covariance matrix formula, data is expected to be the matrix of the dataset
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
  // ------------------------- EIGENS AND PROJECTIONS -------------------------
  // eigenvalues and vectors
  'eigen': (X) => {
    return eigs(X)
  },
  // projection matrix for future use?
  //A(A^tA)^−1 A^t=P
  'projection': (X, T = false) => {
    let data = X
    if (T) data = transpose(data)
    return multiply(data, inv(multiply(transpose(data), data)), transpose(data))
  },
  'projectVector': (X, v) => {
    const diff = v.length - X[0].length
    if (diff < 0) {
      alert('error, projecting into higher space')
      return
    }
    let zeroArray = Array(diff).fill(0)
    for (let i = 0; i < X.length; i++) {
      X[i] = X[i].concat(zeroArray)
    }
    return multiply(X, v)
  },
  // percent is in decimals i guess?
  'PCA': (dataSet, percent = 0.95) => {
    let covMat = formulas.covMat(dataSet)
    let eigen = formulas.eigen(covMat)
    let totalVariance = 0
    let explainedVariance = 0
    for (let i of eigen.values) totalVariance += i
    let eigenvaluesSorted = [...eigen.values]
    eigenvaluesSorted.sort().reverse()
    let topEigenvalues = []
    let featureMatrix = Array.from(Array(dataSet[0].length), () => [])
    for (let i of eigenvaluesSorted) {
      explainedVariance += i
      topEigenvalues.push(i)
      if (explainedVariance / totalVariance > percent) break
    }
    // need to find eigen vectors relevant to the highest eigenvalues and keep track of the feature matrix
    for (let i of topEigenvalues) {
      const index = eigen.values.indexOf(i)
      for (let j = 0; j < featureMatrix.length; j++) {
        featureMatrix[j].push(eigen.vectors[j][index])
      }
    }
    // then multiply feature matrix by dataSet
    return (multiply(dataSet, featureMatrix))
    // return PCA matrix
  },
  // takes in data points and labels, returns a model. use SVM.predict(testdata) to get array of labels.
  'svm': (dataPoints, labels, c = 1) => {
    let SVM = new svm.SVM()
    SVM.train(dataPoints, labels, { C: c })
    return SVM
  },
  "svmPrototype": Object.getPrototypeOf(svmPrototype)
}

// let projectionSquared = multiply(data.projectionMatrix.matrix, data.projectionMatrix.matrix)
// for (let i = 0; i < data.projectionMatrix.matrix.length; i++) {
//   for (let j = 0; j < data.projectionMatrix.matrix[i].length; j++) {
//     if (data.projectionMatrix.matrix[i][j] != projectionSquared[i][j]) {
//       console.log('not equal')
//       break
//     }
//   }
// }
// console.log(projectionSquared)

// let testProjectionSquared = multiply(testProjection, testProjection)
// for (let i = 0; i < testProjection.length; i++) {
//   for (let j = 0; j < testProjection[i].length; j++) {
//     if (testProjection[i][j] != testProjectionSquared[i][j]) {
//       console.log('not equal')
//       break
//     }
//   }
// }
// console.log(testProjection, testProjectionSquared)

export default formulas