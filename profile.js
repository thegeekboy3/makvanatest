const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {

    addItem(profile, itemId, item, profileChangesArr) {
        if (profile.items[itemId]) {
            return false;
        }

        profile.items[itemId] = item;

        if (profileChangesArr) {
            profileChangesArr.push({ "changeType": "itemAdded", "itemId": itemId, "item": item });
        }

        return true;
    },

    removeItem(profile, itemId, profileChangesArr) {
        if (!profile.items[itemId]) {
            return false;
        }

        if (profileChangesArr) {
            profileChangesArr.push({ "changeType": "itemRemoved", "itemId": itemId });
        }

        return true;
    },

    changeItemQuantity(profile, itemId, newQuantity, profileChangesArr) {
        if (!profile.items[itemId] || profile.items[itemId].quantity == newQuantity) {
            return false;
        }

        profile.items[itemId].quantity = newQuantity;

        if (profileChangesArr != null) {
            profileChangesArr.push({ "changeType": "itemQuantityChanged", "itemId": itemId, "quantity": newQuantity });
        }

        return true;
    },

    changeItemAttribute(profile, itemId, attributeName, attributeValue, profileChangesArr) {
        var item = profile.items[itemId];

        if (!item) {
            return false;
        }

        if (!item.attributes) {
            item.attributes = {};
        }

        item.attributes[attributeName] = attributeValue;

        if (profileChangesArr != null) {
            profileChangesArr.push({ "changeType": "itemAttrChanged", "itemId": itemId, "attributeName": attributeName, "attributeValue": attributeValue });
        }

        return true;
    },


    modifyStat(profile, statName, statValue, profileChangesArr) {
        if (!statName || statValue == null) {
            return false;
        }
        profile.stats.attributes[statName] = statValue;

        if (profileChangesArr != null) {
            profileChangesArr.push({ "changeType": "statModified", "name": statName, "value": statValue });
        }

        return true;
    },

    bumpRvn(profile) {
        profile.rvn += 1;
        profile.updated = new Date().toISOString();
        profile.commandRevision += 1;
        return profile;
    },

    readProfile(accountId, profileId) {
        try {
            return JSON.parse(fs.readFileSync(path.join(__dirname, `/accounts/${accountId}/profiles/profile_${profileId}.json`), "utf8"));
        } catch (e) {
            return null;
        }
    },

    readProfileTemplate(profileId) {
        try {
            return JSON.parse(fs.readFileSync(path.join(__dirname, `/account_template/profiles/profile_${profileId}.json`), "utf8"));
        } catch (e) {
            return null;
        }
    },

    async updatedCos(profileData){
    const data = (await axios.get("https://fortnite-api.com/v2/cosmetics/br")).data;
    for (cosmetic of data.data) {
        const item = {
            "templateId": cosmetic.type.backendValue + ":" + cosmetic.id.toLowerCase(),
            "attributes": {
                "max_level_bonus": 0,
                "level": 1,
                "item_seen": true,
                "rnd_sel_cnt": 0,
                "xp": 0,
                "variants": cosmetic.variants ? cosmetic.variants.map(it => {
                    return {
                        channel: it.channel,
                        active: it.options[0].tag,
                        owned: it.options.map(it => it.tag)
                    };
                }) : [],
                "favorite": false
            },
            "quantity": 1
        };
        profileData.items[item.templateId] = item;
    }
    return true;
},

    saveProfile(accountId, profileId, data) {
        fs.writeFileSync(path.join(__dirname, `/accounts/${accountId}/profiles/profile_${profileId}.json`), JSON.stringify(data, null, 2));
    }
};
