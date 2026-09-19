// ========================================
// SELLING DECISION
// ========================================

const getSellingDecision = async (req, res) => {
    try {

        const {
            crop,
            quantity,
            unit,
            quality,
            harvestDate,
            shelfLife,
            location,
            currentPrice,
            predictedPrice,
            demand,
            spoilageRisk
        } = req.body;


        if (
            !crop ||
            quantity === undefined ||
            !harvestDate ||
            shelfLife === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Crop, quantity, harvest date and shelf life are required"
            });
        }


        // --------------------------------
        // Temporary decision logic
        // --------------------------------
        //
        // This is a backend contract for now.
        // The ML team can replace this with
        // the actual FastAPI AI service later.
        // --------------------------------

        let decision = "HOLD";
        let reason =
            "Market information suggests holding the produce.";

        const price = Number(
            predictedPrice || currentPrice || 0
        );

        const demandValue = Number(
            demand || 0
        );

        const spoilageValue = Number(
            spoilageRisk || 0
        );


        if (spoilageValue >= 0.7) {

            decision = "SELL_NOW";

            reason =
                "High spoilage risk indicates that the produce should be sold quickly.";

        } else if (
            price > Number(currentPrice || 0) &&
            demandValue >= 0.6
        ) {

            decision = "WAIT";

            reason =
                "Predicted price and demand indicate a possible benefit from waiting.";

        } else if (demandValue >= 0.7) {

            decision = "SELL_NOW";

            reason =
                "High market demand indicates a suitable selling opportunity.";

        } else {

            decision = "HOLD";

            reason =
                "Current market conditions do not indicate an urgent need to sell.";
        }


        res.status(200).json({
            success: true,

            decision: {
                action: decision,

                crop,

                quantity,

                unit: unit || "kg",

                quality: quality || null,

                harvestDate,

                shelfLife,

                location: location || null,

                currentPrice:
                    currentPrice || null,

                predictedPrice:
                    predictedPrice || null,

                demand:
                    demand || null,

                spoilageRisk:
                    spoilageRisk || null,

                reason
            }
        });


    } catch (error) {

        console.error(
            "Selling decision error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    getSellingDecision
};