import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DefaultPortModel,
  RightAngleLinkFactory,
  LinkModel,
  RightAngleLinkModel,
} from "@projectstorm/react-diagrams";
import * as ReactDOM from "react-dom";
import styles from "./Tree.module.css";
import {
  AbstractModelFactory,
  CanvasWidget,
} from "@projectstorm/react-canvas-core";

// When new link is created by clicking on port the RightAngleLinkModel needs to be returned.
export class RightAnglePortModel extends DefaultPortModel {
  createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
    return new RightAngleLinkModel();
  }
}

// create an instance of the engine with all the defaults
const engine = createEngine();
engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());

// node 1
const node1 = new DefaultNodeModel({
  name: "Node 1",
  color: "rgb(0,192,255)",
});
node1.setPosition(100, 100);
let port1 = node1.addPort(new RightAnglePortModel(false, "out-1", "Out"));

// node 2
const node2 = new DefaultNodeModel({
  name: "Node 1",
  color: "rgb(0,192,255)",
});
node2.setPosition(100, 100);
let port2 = node2.addPort(new RightAnglePortModel(true, "in-1", "In"));

// link them and add a label to the link
const link = port1.link(port2);
// link.addLabel("Hello World!");

const model = new DiagramModel();
model.addAll(node1, node2, link);
engine.setModel(model);

export default function Tree() {
  return <CanvasWidget engine={engine} className={styles.tree} />;
}
