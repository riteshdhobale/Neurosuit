import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { RewardPredictionError } from '@/types/dopamine';
import { Info } from 'lucide-react';
import {
    Tooltip as TooltipUI,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Component for demonstrating and visualizing reward prediction error (RPE)
 * RPE = Actual Reward - Expected Reward
 * This is central to dopamine function in the brain and learning
 */
export const RewardPredictionErrorViz = () => {
    const [expectedReward, setExpectedReward] = useState<number>(50);
    const [actualReward, setActualReward] = useState<number>(50);
    const [rpeHistory, setRpeHistory] = useState<RewardPredictionError[]>([]);
    const [learningRate, setLearningRate] = useState<number>(0.2); // 0.0-1.0
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    // Calculate the reward prediction error
    const rpe = actualReward - expectedReward;

    // Impact on learning is stronger when RPE is larger (positive or negative)
    const impactOnLearning = Math.abs(rpe) * (rpe > 0 ? 0.1 : 0.15);

    const recordPrediction = () => {
        // Create new prediction record
        const newPrediction: RewardPredictionError = {
            expectedReward,
            actualReward,
            error: rpe,
            impactOnLearning
        };

        // Add to history
        setRpeHistory(prev => [...prev, newPrediction]);

        // Update expected reward based on the prediction error and learning rate
        // This simulates how the brain adjusts expectations based on past experience
        setExpectedReward(prev => Math.min(100, Math.max(0, prev + (rpe * learningRate))));
    };

    const resetDemo = () => {
        setExpectedReward(50);
        setActualReward(50);
        setRpeHistory([]);
    };

    const getColorForRPE = (value: number) => {
        if (value > 15) return 'text-green-500'; // Large positive RPE (very good)
        if (value > 5) return 'text-green-400'; // Positive RPE (good)
        if (value >= -5) return 'text-blue-500'; // Neutral RPE (as expected)
        if (value >= -15) return 'text-amber-500'; // Negative RPE (bad)
        return 'text-red-500'; // Large negative RPE (very bad)
    };

    const getDescriptionForRPE = (value: number) => {
        if (value > 30) return 'Extremely positive! Major dopamine release';
        if (value > 15) return 'Very positive! Strong dopamine release';
        if (value > 5) return 'Better than expected! Dopamine increase';
        if (value >= -5 && value <= 5) return 'As expected. Minimal dopamine change';
        if (value >= -15) return 'Worse than expected. Dopamine decrease';
        if (value >= -30) return 'Much worse than expected! Dopamine suppression';
        return 'Extremely disappointing! Major dopamine suppression';
    };

    return (
        <Card className="border-primary/20">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            Reward Prediction Error
                            <TooltipProvider>
                                <TooltipUI>
                                    <TooltipTrigger asChild>
                                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-sm">
                                        <p>Reward Prediction Error (RPE) is central to how dopamine works. When rewards exceed expectations, dopamine neurons fire more (positive RPE). When rewards are below expectations, dopamine neurons fire less (negative RPE).</p>
                                    </TooltipContent>
                                </TooltipUI>
                            </TooltipProvider>
                        </CardTitle>
                        <CardDescription>
                            How your brain learns from prediction errors
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowExplanation(!showExplanation)}>
                        {showExplanation ? 'Hide Science' : 'Show Science'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {showExplanation && (
                    <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-3 mb-2">
                        <p>
                            <span className="font-medium">Reward Prediction Error</span> is a fundamental concept in neuroscience that explains how the brain learns from experiences. It's calculated as:
                        </p>
                        <p className="font-mono text-center">RPE = Actual Reward - Expected Reward</p>
                        <p>When we experience something better than expected (positive RPE), dopamine neurons fire more, reinforcing the behavior. When something is worse than expected (negative RPE), dopamine neurons fire less, discouraging the behavior.</p>
                        <p>This is how habits form and how we learn to seek or avoid experiences. The strength of this learning depends on the size of the prediction error and the brain's learning rate.</p>
                    </div>
                )}

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium">Expected Reward</label>
                            <span className="text-sm text-muted-foreground">{expectedReward}</span>
                        </div>
                        <Slider
                            value={[expectedReward]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(values) => setExpectedReward(values[0])}
                            className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground italic">What your brain predicts will happen</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium">Actual Reward</label>
                            <span className="text-sm text-muted-foreground">{actualReward}</span>
                        </div>
                        <Slider
                            value={[actualReward]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(values) => setActualReward(values[0])}
                            className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground italic">What actually happens</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium">Learning Rate</label>
                            <span className="text-sm text-muted-foreground">{learningRate.toFixed(1)}</span>
                        </div>
                        <Slider
                            value={[learningRate * 10]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(values) => setLearningRate(values[0] / 10)}
                            className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground italic">How quickly your brain updates its predictions</p>
                    </div>

                    <div className="rounded-lg bg-card p-4 border border-border">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium">Reward Prediction Error:</span>
                                <span className={`font-bold ${getColorForRPE(rpe)}`}>
                                    {rpe > 0 ? '+' : ''}{rpe.toFixed(1)}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {getDescriptionForRPE(rpe)}
                            </p>
                            <div className="mt-4 flex gap-3">
                                <Button onClick={recordPrediction} className="flex-1" size="sm">
                                    Record Prediction
                                </Button>
                                <Button onClick={resetDemo} variant="outline" size="sm" className="flex-1">
                                    Reset Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {rpeHistory.length > 0 && (
                    <div className="pt-4">
                        <h4 className="font-medium mb-3">Learning History</h4>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={rpeHistory.map((point, index) => ({
                                        trial: index + 1,
                                        expected: point.expectedReward,
                                        actual: point.actualReward,
                                        error: point.error
                                    }))}
                                    margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="trial"
                                        stroke="hsl(var(--muted-foreground))"
                                        label={{ value: "Trial #", position: "insideBottomRight", offset: 0 }}
                                    />
                                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                                    <Tooltip
                                        formatter={(value: number, name: string) => {
                                            if (name === "error") return [`${value > 0 ? '+' : ''}${value.toFixed(1)}`, "Prediction Error"];
                                            if (name === "expected") return [value.toFixed(1), "Expected Reward"];
                                            if (name === "actual") return [value.toFixed(1), "Actual Reward"];
                                            return [value, name];
                                        }}
                                    />
                                    <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="3 3" />
                                    <Line type="monotone" dataKey="expected" stroke="#3b82f6" strokeWidth={2} name="Expected" />
                                    <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} name="Actual" />
                                    <Line type="monotone" dataKey="error" stroke="#8b5cf6" strokeDasharray="5 5" name="Error" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Notice how your brain's expectations (blue line) gradually shift toward the actual rewards (red line) over time.
                            This is neuroplasticity in action!
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};