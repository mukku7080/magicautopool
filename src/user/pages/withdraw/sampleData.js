// Sample data for testing pagination
export const generateSampleWithdrawHistory = (count = 25) => {
    const statuses = ['pending', 'completed', 'failed', 'cancelled'];
    const sampleData = [];

    for (let i = 1; i <= count; i++) {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const amount = (Math.random() * 1000 + 50).toFixed(2);
        const fee = (parseFloat(amount) * 0.05).toFixed(2);
        const paidAmount = (parseFloat(amount) - parseFloat(fee)).toFixed(2);
        
        sampleData.push({
            id: i,
            withdraw_amount: amount,
            paid_amount: paidAmount,
            fees_deduction: fee,
            available_amount: (Math.random() * 5000 + 1000).toFixed(2),
            remain_amount: (Math.random() * 3000 + 500).toFixed(2),
            from_address: `0x${Math.random().toString(16).substr(2, 40)}`,
            to_address: `0x${Math.random().toString(16).substr(2, 40)}`,
            txn_hash: Math.random() > 0.5 ? `0x${Math.random().toString(16).substr(2, 64)}` : null,
            status: randomStatus,
            date_time: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        });
    }

    return sampleData;
};