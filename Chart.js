/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2013 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */

//Define the global Chart Variable as a class.
window.Chart = function(context) {

    var chart = this;
    //Easing functions adapted from Robert Penner's easing equations
    //http://www.robertpenner.com/easing/

    var animationOptions = {
        linear: function(t) {
            return t;
        },
        easeInQuad: function(t) {
            return t * t;
        },
        easeOutQuad: function(t) {
            return -1 * t * (t - 2);
        },
        easeInOutQuad: function(t) {
            if ((t /= 1 / 2) < 1)
                return 1 / 2 * t * t;
            return -1 / 2 * ((--t) * (t - 2) - 1);
        },
        easeInCubic: function(t) {
            return t * t * t;
        },
        easeOutCubic: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1);
        },
        easeInOutCubic: function(t) {
            if ((t /= 1 / 2) < 1)
                return 1 / 2 * t * t * t;
            return 1 / 2 * ((t -= 2) * t * t + 2);
        },
        easeInQuart: function(t) {
            return t * t * t * t;
        },
        easeOutQuart: function(t) {
            return -1 * ((t = t / 1 - 1) * t * t * t - 1);
        },
        easeInOutQuart: function(t) {
            if ((t /= 1 / 2) < 1)
                return 1 / 2 * t * t * t * t;
            return -1 / 2 * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint: function(t) {
            return 1 * (t /= 1) * t * t * t * t;
        },
        easeOutQuint: function(t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
        },
        easeInOutQuint: function(t) {
            if ((t /= 1 / 2) < 1)
                return 1 / 2 * t * t * t * t * t;
            return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine: function(t) {
            return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(t) {
            return 1 * Math.sin(t / 1 * (Math.PI / 2));
        },
        easeInOutSine: function(t) {
            return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
        },
        easeInExpo: function(t) {
            return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
        },
        easeOutExpo: function(t) {
            return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
        },
        easeInOutExpo: function(t) {
            if (t == 0)
                return 0;
            if (t == 1)
                return 1;
            if ((t /= 1 / 2) < 1)
                return 1 / 2 * Math.pow(2, 10 * (t - 1));
            return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function(t) {
            if (t >= 1)
                return t;
            return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
        },
        easeOutCirc: function(t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
        },
        easeInOutCirc: function(t) {
            if ((t /= 1 / 2) < 1)
                return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
            return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0)
                return 0;
            if ((t /= 1) == 1)
                return 1;
            if (!p)
                p = 1 * .3;
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
        },
        easeOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0)
                return 0;
            if ((t /= 1) == 1)
                return 1;
            if (!p)
                p = 1 * .3;
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(1 / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
        },
        easeInOutElastic: function(t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t == 0)
                return 0;
            if ((t /= 1 / 2) == 2)
                return 1;
            if (!p)
                p = 1 * (.3 * 1.5);
            if (a < Math.abs(1)) {
                a = 1;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(1 / a);
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
        },
        easeInBack: function(t) {
            var s = 1.70158;
            return 1 * (t /= 1) * t * ((s + 1) * t - s);
        },
        easeOutBack: function(t) {
            var s = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
        },
        easeInOutBack: function(t) {
            var s = 1.70158;
            if ((t /= 1 / 2) < 1)
                return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
            return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
        },
        easeInBounce: function(t) {
            return 1 - animationOptions.easeOutBounce(1 - t);
        },
        easeOutBounce: function(t) {
            if ((t /= 1) < (1 / 2.75)) {
                return 1 * (7.5625 * t * t);
            } else if (t < (2 / 2.75)) {
                return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
            } else if (t < (2.5 / 2.75)) {
                return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
            } else {
                return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
            }
        },
        easeInOutBounce: function(t) {
            if (t < 1 / 2)
                return animationOptions.easeInBounce(t * 2) * .5;
            return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
        }
    };

    //Variables global to the chart
    var width = context.canvas.width;
    var height = context.canvas.height;


    //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
    if (window.devicePixelRatio) {
        context.canvas.style.width = width + "px";
        context.canvas.style.height = height + "px";
        context.canvas.height = height * window.devicePixelRatio;
        context.canvas.width = width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }





    this.Line = function(data, options) {

        chart.Line.defaults = {
            scaleOverlay: false,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: true,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: false,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 2,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animation: true,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var config = (options) ? mergeChartConfig(chart.Line.defaults, options) : chart.Line.defaults;

        return new Line(data, config, context);
    };

    var clear = function(c) {
        c.clearRect(0, 0, width, height);
    };

    var Line = function(data, config, ctx) {
        // common variables
        var labelHeight = config.scaleFontSize;
        var labelTemplateString = (config.scaleShowLabels) ? config.scaleLabel : "";
        var rotateLabels=0;
        // ---------------------------
        // y specific variables
        var  scaleHopY, valuesYAxis, valueBoundsY, locationY, yAxisLength, widestYLabel;
        // x specific variables
        var scaleHopX, valuesXAxis, valueBoundsX, locationX, xAxisLength, widestXLabel;
        // find ranges of two Axises
        valueBoundsX = getXAxisLimits();
        valueBoundsY = getYAxisLimits();
        // define the steps on the Axises
        if (!config.scaleOverride) {
            valuesXAxis = calculateScale(valueBoundsX.maxSteps, valueBoundsX.minSteps, valueBoundsX.maxValue, valueBoundsX.minValue, labelTemplateString);
            valuesYAxis = calculateScale(valueBoundsY.maxSteps, valueBoundsY.minSteps, valueBoundsY.maxValue, valueBoundsY.minValue, labelTemplateString);
        } else {
            valuesXAxis = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            };
            populateLabels(labelTemplateString, valuesXAxis.labels, valuesXAxis.steps, config.scaleStartValue, config.scaleStepWidth);
            
            valuesYAxis = {
                steps: config.scaleSteps,
                stepValue: config.scaleStepWidth,
                graphMin: config.scaleStartValue,
                labels: []
            };
            populateLabels(labelTemplateString, valuesYAxis.labels, valuesYAxis.steps, config.scaleStartValue, config.scaleStepWidth);
        }
        // calculate the X and Y axis lengths
        calculateYAxisLength();
        calculateXAxisLength();
        
        
        
        scaleHopY = Math.floor(yAxisLength / valuesYAxis.steps);
        scaleHopX = Math.floor(xAxisLength / valuesXAxis.steps);
        console.log(valueBoundsX);
        console.log(valueBoundsY);
        console.log('(1)');
        console.log(valuesXAxis);
        console.log(valuesYAxis);
        animationLoop(config, drawScale, drawLines, ctx);
        
        function drawLines(animPc) {
            for (var i = 0; i < data.datasets.length; i++) {
                ctx.strokeStyle = data.datasets[i].strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.beginPath();
                ctx.moveTo(locationX, locationY - animPc * (calculateOffset(data.datasets[i].data[0], valuesYAxis, scaleHopY)))

                for (var j = 1; j < data.datasets[i].data.length; j++) {
                    if (config.bezierCurve) {
                        ctx.bezierCurveTo(xPos(j - 0.5), yPos(i, j - 1), xPos(j - 0.5), yPos(i, j), xPos(j), yPos(i, j));
                    }
                    else {
                        ctx.lineTo(xPos(j), yPos(i, j));
                    }
                }
                ctx.stroke();
                if (config.datasetFill) {
                    ctx.lineTo(locationX + (scaleHopX * (data.datasets[i].data.length - 1)), locationY);
                    ctx.lineTo(locationX, locationY);
                    ctx.closePath();
                    ctx.fillStyle = data.datasets[i].fillColor;
                    ctx.fill();
                }
                else {
                    ctx.closePath();
                }
                if (config.pointDot) {
                    ctx.fillStyle = data.datasets[i].pointColor;
                    ctx.strokeStyle = data.datasets[i].pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    for (var k = 0; k < data.datasets[i].data.length; k++) {
                        ctx.beginPath();
                        ctx.arc(locationX + (scaleHopX * k), locationY - animPc * (calculateOffset(data.datasets[i].data[k], valuesYAxis, scaleHopY)), config.pointDotRadius, 0, Math.PI * 2, true);
                        ctx.fill();
                        ctx.stroke();
                    }
                }
            }

            function yPos(dataSet, iteration) {
                return locationY - animPc * (calculateOffset(data.datasets[dataSet].data[iteration], valuesYAxis, scaleHopY));
            }
            function xPos(iteration) {
                return locationX + (scaleHopX * iteration);
            }
        }
        
        
        function drawScale() {
            //X axis line
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(width - widestXLabel / 2 + 5, locationY);
            ctx.lineTo(width - (widestXLabel / 2) - xAxisLength - 5, locationY);
            ctx.stroke();


            if (rotateLabels > 0) {
                ctx.save();
                ctx.textAlign = "right";
            }
            else {
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            for (var i = 0; i < data.labels.length; i++) {
                ctx.save();
                if (rotateLabels > 0) {
                    ctx.translate(locationX + i * scaleHopX, locationY + config.scaleFontSize);
                    ctx.rotate(-(rotateLabels * (Math.PI / 180)));
                    ctx.fillText(data.labels[i], 0, 0);
                    ctx.restore();
                }

                else {
                    ctx.fillText(data.labels[i], locationX + i * scaleHopX, locationY + config.scaleFontSize + 3);
                }

                ctx.beginPath();
                ctx.moveTo(locationX + i * scaleHopX, locationY + 3);

                //Check i isnt 0, so we dont go over the Y axis twice.
                if (config.scaleShowGridLines && i > 0) {
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(locationX + i * scaleHopX, 5);
                }
                else {
                    ctx.lineTo(locationX + i * scaleHopX, locationY + 3);
                }
                ctx.stroke();
            }

            //Y axis
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(locationX, locationY + 5);
            ctx.lineTo(locationX, 5);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j = 0; j < valuesYAxis.steps; j++) {
                ctx.beginPath();
                ctx.moveTo(locationX - 3, locationY - ((j + 1) * scaleHopY));
                if (config.scaleShowGridLines) {
                    ctx.lineWidth = config.scaleGridLineWidth;
                    ctx.strokeStyle = config.scaleGridLineColor;
                    ctx.lineTo(locationX + xAxisLength + 5, locationY - ((j + 1) * scaleHopY));
                }
                else {
                    ctx.lineTo(locationX - 0.5, locationY - ((j + 1) * scaleHopY));
                }

                ctx.stroke();

                if (config.scaleShowLabels) {
                    ctx.fillText(valuesYAxis.labels[j], locationX - 8, locationY - ((j + 1) * scaleHopY));
                }
            }
        }
        
        function calculateXAxisLength() {
            widestYLabel = 1;
            //if we are showing the labels
            if (config.scaleShowLabels) {
                ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
                for (var i = 0; i < valuesYAxis.labels.length; i++) {
                    var measuredText = ctx.measureText(valuesYAxis.labels[i]).width;
                    widestYLabel = (measuredText > widestYLabel) ? measuredText : widestYLabel;
                }
                //Add a little extra padding from the y axis
                widestYLabel += 10;
            }
            xAxisLength = width - widestYLabel - widestXLabel;
            

            locationX = width - widestXLabel / 2 - xAxisLength;
            locationY = yAxisLength + config.scaleFontSize / 2;
        }

        function calculateYAxisLength() {
            var maxSize = height;
            ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
            widestXLabel = 1;
            for (var i = 0; i < valuesXAxis.labels.length; i++) {
                var textLength = ctx.measureText(valuesXAxis.labels[i]).width;
                widestXLabel = (textLength > widestXLabel) ? textLength : widestXLabel;
            }
            if (width / valuesXAxis.labels.length < widestXLabel) {
                rotateLabels = 45;
                if (width / valuesXAxis.labels.length < Math.cos(rotateLabels) * widestXLabel) {
                    rotateLabels = 90;
                    maxSize -= widestXLabel;
                } else {
                    maxSize -= Math.sin(rotateLabels) * widestXLabel;
                }
            } else {
                maxSize -= config.scaleFontSize;
            }
            //Add a little padding between the x line and the text
            maxSize -= 5;            
            maxSize -= labelHeight;
            //Set 5 pixels greater than the font size to allow for a little padding from the X axis.
            yAxisLength = maxSize;
        }
        
        
        function getXAxisLimits() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i = 0; i < data.labels.length; i++) {
                    if (data.labels[i] > upperValue) {
                        upperValue = data.labels[i];
                    }
                    if (data.labels[i] < lowerValue) {
                        lowerValue = data.labels[i];
                    }
            }
            
            var maxSteps = Math.floor((xAxisLength / (labelHeight * 0.66)));
            var minSteps = Math.floor((xAxisLength / labelHeight * 0.5));

            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: maxSteps,
                minSteps: minSteps
            };
        }
        
        
        function getYAxisLimits() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.datasets[i].data.length; j++) {
                    if (data.datasets[i].data[j] > upperValue) {
                        upperValue = data.datasets[i].data[j]
                    }
                    if (data.datasets[i].data[j] < lowerValue) {
                        lowerValue = data.datasets[i].data[j]
                    }
                }
            }
            // put here calculateScale
            var maxSteps = Math.floor((yAxisLength / (labelHeight * 0.66)));
            var minSteps = Math.floor((yAxisLength / labelHeight * 0.5));

            return {
                maxValue: upperValue,
                minValue: lowerValue,
                maxSteps: maxSteps,
                minSteps: minSteps
            };
        }    
    }

    function calculateOffset(val, valuesYAxis, scaleHopY) {
        var outerValue = valuesYAxis.steps * valuesYAxis.stepValue;
        var adjustedValue = val - valuesYAxis.graphMin;
        var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
        return (scaleHopY * valuesYAxis.steps) * scalingFactor;
    }

    function animationLoop(config, drawScale, drawData, ctx) {
        var animFrameAmount = (config.animation) ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1,
            easingFunction = animationOptions[config.animationEasing],
            percentAnimComplete = (config.animation) ? 0 : 1;

        if (typeof drawScale !== "function")
            drawScale = function() {
            };

        requestAnimFrame(animLoop);

        function animateFrame() {
            var easeAdjustedAnimationPercent = (config.animation) ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
            clear(ctx);
            if (config.scaleOverlay) {
                drawData(easeAdjustedAnimationPercent);
                drawScale();
            } else {
                drawScale();
                drawData(easeAdjustedAnimationPercent);
            }
        }
        function animLoop() {
            //We need to check if the animation is incomplete (less than 1), or complete (1).
            percentAnimComplete += animFrameAmount;
            animateFrame();
            //Stop the loop continuing forever
            if (percentAnimComplete <= 1) {
                requestAnimFrame(animLoop);
            }
            else {
                if (typeof config.onAnimationComplete == "function")
                    config.onAnimationComplete();
            }
        }
    }

    //Declare global functions to be called within this namespace here.
    // shim layer with setTimeout fallback
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    function calculateScale(maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
        var graphMin, graphMax, graphRange, stepValue, numberOfSteps, valueRange, rangeOrderOfMagnitude, decimalNum;

        valueRange = maxValue - minValue;
        rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);
        graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
        graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
        graphRange = graphMax - graphMin;
        stepValue = Math.pow(10, rangeOrderOfMagnitude);
        numberOfSteps = Math.round(graphRange / stepValue);

        //Compare number of steps to the max and min for that size graph, and add in half steps if need be.	        
        while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
            if (numberOfSteps < minSteps) {
                stepValue /= 2;
                numberOfSteps = Math.round(graphRange / stepValue);
            }
            else {
                stepValue *= 2;
                numberOfSteps = Math.round(graphRange / stepValue);
            }
        };

        var labels = [];
        populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);

        return {
            steps: numberOfSteps,
            stepValue: stepValue,
            graphMin: graphMin,
            labels: labels

        }

        function calculateOrderOfMagnitude(val) {
            return Math.floor(Math.log(val) / Math.LN10);
        }
    }

    //Populate an array of all the labels by interpolating the string.
    function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
        if (labelTemplateString) {
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i = 1; i < numberOfSteps + 1; i++) {
                labels.push(tmpl(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))}));
            }
        }
    }

    //Max value from array
    function Max(array) {
        return Math.max.apply(Math, array);
    }
    ;
    //Min value from array
    function Min(array) {
        return Math.min.apply(Math, array);
    }
    ;
    //Default if undefined
    function Default(userDeclared, valueIfFalse) {
        if (!userDeclared) {
            return valueIfFalse;
        } else {
            return userDeclared;
        }
    }
    ;
    //Is a number function
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    //Apply cap a value at a high or low number
    function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue)) {
            if (valueToCap > maxValue) {
                return maxValue;
            }
        }
        if (isNumber(minValue)) {
            if (valueToCap < minValue) {
                return minValue;
            }
        }
        return valueToCap;
    }
    function getDecimalPlaces(num) {
        var numberOfDecimalPlaces;
        if (num % 1 != 0) {
            return num.toString().split(".")[1].length
        }
        else {
            return 0;
        }

    }

    function mergeChartConfig(defaults, userDefined) {
        var returnObj = {};
        for (var attrname in defaults) {
            returnObj[attrname] = defaults[attrname];
        }
        for (var attrname in userDefined) {
            returnObj[attrname] = userDefined[attrname];
        }
        return returnObj;
    }

    //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
    var cache = {};

    function tmpl(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +
                // Convert the template into pure JavaScript
                str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
                + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    }
    ;
}


