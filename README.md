# Prototype

This is a prototype for the factcheckthe.news API.

## Motivation

The motivation for this project is to raise awareness of credible vs. non-credible sources of information.

## Getting Started

- `npm install` to install packages
- `npm run opensources` to fetch the latest data from OpenSources
- `serverless deploy` to deploy to AWS

### Stage Variables

The following [stage variables](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-set-stage-variables-aws-console.html) 
need to be configured in API Gateway to call 3rd-party APIs.

- **WOT_API_KEY**: The Web of Trust API requires an API key.

## Credits

- Data from [OpenSources](http://www.opensources.co/), which powers the [B.S. Detector browser plugin](http://bsdetector.tech/)
- Website reputation data comes from [Web of Trust](https://www.mywot.com/).

## License

Apache 2.0
