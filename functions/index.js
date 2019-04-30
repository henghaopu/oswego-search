const functions = require('firebase-functions')
const automl = require('@google-cloud/automl')
// *** Adding ({origin: true}) is necessary. ***
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

/*
exports.printMessage = functions.https.onCall((data, context) => {
  // backend console shows in firebase function GUI
  // console.log('this is in printMessage function', data)
  // return 'happy'
  return Promise.resolve('happy')
})
*/

// (GET) his works! 
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   // *** use cors to avaid problem from querying different urls ***
//   cors(request, response, () => {
//     response.send("Hello from Firebase!")
//   })
// })

// (POST) This also works! 
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // *** Be aware! request.body will print {} which is misleading ***
    let base64Image = request.body.payload.image.imageBytes
    response.send('HEHE' + base64Image)
  })
})

exports.getImageLabels = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // new image from camera to test our custom model
    let base64Image = request.body.payload.image.imageBytes
    // Create client for prediction service.
    const client = new automl.PredictionServiceClient()
    // autoML project info
    const projectId = 'oswego-search'
    const computeRegion = 'us-central1'
    // *** not 'oswego_dataset_v20190401032113' -> will cause error 5 which renders URI as an invalid resource ID ***
    const modelId = 'ICN4949278095472438711'
    const scoreThreshold = '0.0'
    // Get the full path of the model.
    const modelFullId = client.modelPath(projectId, computeRegion, modelId);
    // found the bug of wrong bug through this console.log
    // console.log(modelFullId)
    const params = {}
    if (scoreThreshold) {
      params.score_threshold = scoreThreshold;
    }
    // Set the payload by giving the content and type of the file.
    const payload = {
      image: { imageBytes: base64Image }
    }
    const requestBody = {
      name: modelFullId,
      payload: payload,
      params: params
    }
    
    client.predict(requestBody)
    .then(res => {
      // // log to firebase function GUI
      // console.log('Got a prediction from AutoML API!', JSON.stringify(res));
      response.send(res)
    })
    .catch(err => {
      // // log to firebase function GUI
      // console.error('Got a prediction from AutoML API!', JSON.stringify(err))
      response.send(err)
    })

  })

})

exports.getImageLabelsFail = functions.https.onCall((data, context) => {
  let base64Image = data.base64Image
  // return { predict: client.predict, request: requestBody, client: client }
  // client.predict(requestBody).then(responses => {  
  //   return responses
  // })
  // .then( responses => {
  //   resolve(responses)
  // })
  // .catch( err => {
  //   reject(err)
  // })

  // return callAutoMLAPI(base64Image)
  // Create client for prediction service.
  const client = new automl.PredictionServiceClient()

  const projectId = 'oswego-search'
  const computeRegion = 'us-central1'
  const modelId = 'oswego_dataset_v20190401032113'
  const scoreThreshold = '0.0'

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);
  const params = {}
  if (scoreThreshold) {
    params.score_threshold = scoreThreshold;
  }
  // Set the payload by giving the content and type of the file.
  const payload = {
    image: { imageBytes: base64Image }
  }
  const request = {
    name: modelFullId,
    payload: payload,
    params: params
  }
  
  // return { predict: client.predict, request: requestBody, client: client }
  client.predict(request)
  .then( responses => {
    const response = responses[0];
    // doThingsWith(response)
    console.log(response)
    return response
  })
  .catch( err => {
    console.error(err)
  })

  
  // client.predict(requestBody).then( ([response]) => {
  //   // return Promise.resolve(JSON.stringify(responses))
  //   return Promise.resolve('hehe')

  // }).catch( err => {
  //   return Promise.resolve(err)
  // })
  
  // return Promise.resolve('happy'+ JSON.stringify(data))
})

function callAutoMLAPI(base64Image) {
  return new Promise((resolve, reject) => {

    // Create client for prediction service.
    const client = new automl.PredictionServiceClient()
    // Creates a client
    // const autoMlClient = new automl.AutoMlClient();

    const projectId = 'oswego-search'
    const computeRegion = 'us-central1'
    const modelId = 'oswego_dataset_v20190401032113'
    const scoreThreshold = '0.0'

    // Get the full path of the model.
    const modelFullId = client.modelPath(projectId, computeRegion, modelId);
    const params = {}
    if (scoreThreshold) {
      params.score_threshold = scoreThreshold;
    }
    // Set the payload by giving the content and type of the file.
    const payload = {
      image: { imageBytes: base64Image }
    }
    const request = {
      name: modelFullId,
      payload: payload,
      params: params
    }
    
    client.predict(request)
    .then( responses => {
      resolve(responses)
    })
    .catch( err => {
      reject(err)
    })
  })
}