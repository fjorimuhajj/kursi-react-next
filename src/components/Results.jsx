import { calculateInvestmentResults, formatter } from "../util/investment.js";

export  default function Results({ input }) {
    const inputIsInvalid =
        input.duration <= 0 ||
        input.duration === "" ||
        input.initialInvestment === "" ||
        input.annualInvestment === "" ||
        input.expectedReturn === "";

    if (inputIsInvalid) {
        return <p className="center">Please enter valid values to see the results.</p>;
    }

    const resultsData = calculateInvestmentResults(input);
    const initialInvestment = +input.initialInvestment;

    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {resultsData.map((yearData) => {
                    const totalInvested = initialInvestment + yearData.annualInvestment * yearData.year;
                    const totalInterest = yearData.valueEndOfYear - totalInvested;

                    return (
                        <tr key={yearData.year}>
                            <td>{yearData.year}</td>
                            <td>{formatter.format(yearData.valueEndOfYear)}</td>
                            <td>{formatter.format(yearData.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalInvested)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
