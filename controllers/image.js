const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 6bfb50aaa0ac4c17bc1eb8f9b65699d6");

const handleApiCall = (req, res) => {
  const { input } = req.body
  stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "face-detection",
        inputs: [{data: {image: {url: input}}}]
    },
    metadata,
    (err, apiResponse) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (apiResponse.status.code !== 10000) {
            console.log("Received failed status: " + apiResponse.status.description + "\n" + apiResponse.status.details);
            return;
        }

        console.log("Predicted concepts, with confidence values:")
        for (const c of apiResponse.outputs[0].data.concepts) {
            console.log(c.name + ": " + c.value);
            console.log(apiResponse);
        }
        res.json(apiResponse);
    }
  );
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
  .where({id})
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('error updating entries'))
}

module.exports = {
  handleApiCall,
  handleImage
};