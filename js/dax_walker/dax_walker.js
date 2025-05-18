'use strict';

import { Position } from '../model/Position.js';

const API_URL = "https://50ilph3g8i.execute-api.ap-southeast-2.amazonaws.com/prod";

const errorMessageMapping = {
    "UNMAPPED_REGION": "Unmapped region",
    "BLOCKED": "Tile is blocked",
    "EXCEEDED_SEARCH_LIMIT": "Exceeded search limit",
    "UNREACHABLE": "Unreachable tile",
    "NO_WEB_PATH" : "No web path",
    "INVALID_CREDENTIALS": "Invalid credentials",
    "RATE_LIMIT_EXCEEDED": "Rate limit exceeded",
    "NO_RESPONSE_FROM_SERVER": "No response from server",
    "UNKNOWN": "Unknown"
};

export function getPath({start, end, onSuccess, onError}) {
        const useFairyRings = document.getElementById("fairy-ring").checked;
        const useSpiritTrees = document.getElementById("spirit-tree").checked;
        console.log("F: " + useFairyRings);
        console.log("S: " + useSpiritTrees);
    $.ajax({
        url: API_URL,
        type: 'POST',
        data: JSON.stringify({
            "sourceX": start.x,
            "sourceY": start.y,
            "sourceZ": start.z,
            "destinationX": end.x,
            "destinationY": end.y,
            "destinationZ": end.z,
            "fairyRingsUnlocked": useFairyRings,
            "spiritTreesUnlocked": useSpiritTrees
        }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            // if (data['pathStatus'] !== "SUCCESS") {
            //     onError(start, end, errorMessageMapping[data['pathStatus']]);
            // } else {
                const path = data.message.path;
                const pathPositions = path.map(pos => new Position(pos.x, pos.y, pos.z));
                onSuccess(pathPositions);
            // }
        }
    });
}
