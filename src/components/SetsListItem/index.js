import React from "react";
import {Button, Cell} from "@vkontakte/vkui";

export default function SetsListItem({ go }) {
    return (
        <Cell>
            <Button size="xl" level="2" onClick={() => go('persik')} data-to="persik">
                Show me the Persik, please
            </Button>
        </Cell>
    );
}
