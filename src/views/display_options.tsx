import { BoxRight, Button, createWindowMessage } from "@/gui/gui";
import { ipc } from "@/ipc";
import { Display } from "./display_list";
import { Globals } from "@/globals";


function DisplayOptions({ globals, display, on_close }: { globals: Globals, display: ipc.Display, on_close: () => void }) {
	return <>
		Selected display
		<Display display={display} />
		<BoxRight>
			<Button icon="icons/remove_circle.svg" on_click={() => {
				on_close();

				ipc.display_remove(display.handle).then(() => {
					globals.toast_manager.push("Display removed");
					globals.wm.pop();
				}).catch((e) => {
					globals.wm.push(createWindowMessage(globals.wm, "Error: " + e));
				})
			}} >
				Remove display
			</Button>
		</BoxRight>
	</>
}


export function createWindowDisplayOptions(globals: Globals, display: ipc.Display) {
	globals.wm.push({
		title: "Display options",
		content: <DisplayOptions globals={globals} display={display} on_close={() => {
			globals.wm.pop();
		}} />
	});
}