import React, { useRef, useEffect, useState } from 'react'
import Webcam from "react-webcam"
import * as faceapi from 'face-api.js'

function CameraDisplay() {
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)

    const WIDTH = 800
    const HEIGHT = 600

    const [isDetectionsChecked, setIsDetectionsChecked] = useState(true)
    const [isLandmarksChecked, setIsLandmarksChecked] = useState(true)
    const [isExpressionsChecked, setIsExpressionsChecked] = useState(true)


    useEffect(() => {
        const video = document.getElementById('video')
        const canvas = document.getElementById('canvas')
        const displaySize = { width: WIDTH, height: HEIGHT }
        faceapi.matchDimensions(canvas, displaySize)

        function draw() {
            const interval = setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                //console.log(detections)
                
                if (isDetectionsChecked) {
                    faceapi.draw.drawDetections(canvas, resizedDetections)
                }
                if (isLandmarksChecked) {
                    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                }
                if (isExpressionsChecked) {
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
                }
    
            }, 100)
            return interval
        }
        
        var interval
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]).then(interval = draw())

        return () => clearInterval(interval)

    }, [isDetectionsChecked, isExpressionsChecked, isLandmarksChecked])

    return (
        <div>
            <div>
                <input 
                    type="checkbox" 
                    checked={ isDetectionsChecked } 
                    onChange={ () => setIsDetectionsChecked(!isDetectionsChecked) }
                ></input>
                <label>~Face Detection</label><br/>
                <input 
                    type="checkbox" 
                    checked={ isLandmarksChecked }
                    onChange={ () => setIsLandmarksChecked(!isLandmarksChecked) } 
                ></input>
                <label>~Face Landmark</label><br/>
                <input 
                    type="checkbox" 
                    checked={ isExpressionsChecked } 
                    onChange={ () => setIsExpressionsChecked(!isExpressionsChecked) }
                ></input>
                <label>~Face Expression</label><br/>
            </div>
            <div> 
                <Webcam
                id="video"
                ref={webcamRef}
                muted={true} 
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: WIDTH,
                    height: HEIGHT,
                }}
                />

                <canvas
                id="canvas"
                ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 8,
                    width: WIDTH,
                    height: HEIGHT,
                }}
                />
            </div>
        </div>

    )
}

export default CameraDisplay