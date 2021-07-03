class Editor extends React.Component {
    render() {
        return (
                <div>
                    <h1>Hello, {this.props.name}</h1>
                    <hr/>
                    <div id="toolstatus"></div>
                    <hr/>
                    <div id="container"></div>
                    <WBCanvas />
                    <hr/>
                    <div id="info"></div>
                </div>
                );
    }
}
class WBCanvas extends React.Component {
    
    constructor(props) {
        
        super(props);
        this.comunicationWS =
                new WSBBChannel(BBServiceURL(),
                        (msg) => {
                var obj = JSON.parse(msg);
                         console.log("On func call back ", msg);
                        this.drawPoint(obj.x, obj.y,obj.color1,obj.color2,obj.color3);
                });
        this.myp5 = null;
        this.state = {loadingState: 'Loading Canvas ...'}
        let wsreference = this.comunicationWS; 
        this.sketch = function (p) {
            let x = 100;
            let y = 100;
            let max=255;
            let min=0;
            let max2=200;
            let min2=100;
            let max3=255;
            let min3=200;
          
           
            
            let color1 = Math.round(Math.random() * (max - min) + min);
            let color2 = Math.round(Math.random() * (max2 - min2) + min2);
            let color3 = Math.round(Math.random() * (max3 - min3) + min3);
            let buttonclear;
            p.setup = function () {
                
                p.createCanvas(700, 410);
                p.background(0);
                buttonclear= p.createButton("clear");
                if(buttonclear.mousePressed()){
                    p.clear();
                }
            };
           
            p.draw = function () {
               
                if (p.mouseIsPressed === true) {
                    
                    p.fill(color1, color2, color3);
                    p.ellipse(p.mouseX, p.mouseY, 20, 20);
                    wsreference.send(p.mouseX, p.mouseY,color1,color2,color3); 
                }
                if (p.mouseIsPressed === false) {
                    p.fill(255, 255, 255);
                }
            };
        }
    }
    drawPoint(x, y,color1,color2,color3) {
            this.myp5.fill(color1,color2,color3);
            this.myp5.ellipse(x, y, 20, 20);
    }
    
    componentDidMount() {
        this.myp5 = new p5(this.sketch, 'container');
        this.setState({loadingState: 'Canvas Loaded'});
    }
    render()
    {
        return(
                <div>
                <h4>Drawing status: {this.state.loadingState}</h4>
                </div>);
    }
}

// Retorna la url del servicio. Es una función de configuración.
function BBServiceURL() {
    var host = window.location.host;
    var url = 'wss://' + (host) + '/bbService';
    console.log("URL Calculada: " + url);
    return url;
}
class WSBBChannel {
    constructor(URL, callback) {
        this.URL = URL;
        this.wsocket = new WebSocket(URL);
        this.wsocket.onopen = (evt) => this.onOpen(evt);
        this.wsocket.onmessage = (evt) => this.onMessage(evt);
        this.wsocket.onerror = (evt) => this.onError(evt);
        this.receivef = callback;
    }
    onOpen(evt) {
        console.log("In onOpen", evt);
    }
    onMessage(evt) {
        console.log("In onMessage", evt);
        // Este if permite que el primer mensaje del servidor no se tenga encuenta.
                // El primer mensaje solo confirma que se estableció la conexión.
                // De ahí en adelante intercambiaremos solo puntos(x,y) con el servidor
                if (evt.data != "Connection established.") {
        this.receivef(evt.data);
    }
    }
    onError(evt) {
        console.error("In onError", evt);
    }
    send(x, y,color1,color2,color3) {
        let msg = '{ "x": ' + (x) + ', "y": ' + (y) + ', "color1": ' + (color1)+', "color2": ' + (color2)+', "color3": ' + (color3)+ "}";
        console.log("sending: ", msg);
        this.wsocket.send(msg);
    }
}
ReactDOM.render(
        <Editor name="Andres"/>,
        document.getElementById('root')
        );