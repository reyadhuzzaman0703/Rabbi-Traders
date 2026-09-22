const normalizeBangladeshiPhone = (phone) => {
    if (!phone) {
        return null;
    }

    // Remove spaces and hyphens
    let cleanedPhone = phone.replace(/[\s-]/g, "");

    // Convert 8801XXXXXXXXX → +8801XXXXXXXXX
    if (cleanedPhone.startsWith("8801")) {
        cleanedPhone = `+${cleanedPhone}`;
    }

    // Convert 01XXXXXXXXX → +8801XXXXXXXXX
    if (cleanedPhone.startsWith("01")) {
        cleanedPhone = `+88${cleanedPhone}`;
    }

    return cleanedPhone;
};

const isValidBangladeshiPhone = (phone) => {
    if (!phone) {
        return false;
    }

    // Final format: +8801XXXXXXXXX
    return /^\+8801[3-9]\d{8}$/.test(phone);
};

module.exports = {
    normalizeBangladeshiPhone,
    isValidBangladeshiPhone,
};