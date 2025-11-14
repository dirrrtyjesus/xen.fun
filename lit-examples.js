/**
 * Example LIT Compositions
 * Demonstrating different types of Live Information Tokens
 */

// Initialize the composer
const composer = new LITComposer();

// Example 1: A Knowledge LIT
// This LIT contains coherent information about a concept
function createKnowledgeLIT(topic, knowledge) {
    return composer.compose({
        type: 'knowledge',
        content: {
            topic,
            knowledge,
            citations: [],
            confidence: 0.8,
            id: `knowledge-${topic.toLowerCase().replace(/\s+/g, '-')}`,
            persistent: true
        },
        metadata: {
            domain: 'epistemology',
            created: new Date().toISOString(),
            creator: 'xen.fun'
        },
        capabilities: [
            {
                name: 'query',
                handler: (context) => {
                    return {
                        response: `Information about ${topic}: ${knowledge.substring(0, 100)}...`,
                        confidence: 0.8
                    };
                }
            },
            {
                name: 'expand',
                handler: (context) => {
                    return {
                        expanded: true,
                        newConnections: context.connections || []
                    };
                }
            }
        ]
    });
}

// Example 2: A Process LIT
// This LIT encodes an agential process that can execute
function createProcessLIT(name, steps) {
    return composer.compose({
        type: 'process',
        content: {
            name,
            steps,
            currentStep: 0,
            status: 'ready',
            id: `process-${name.toLowerCase().replace(/\s+/g, '-')}`,
            persistent: true,
            metadata: {
                totalSteps: steps.length,
                completedSteps: 0
            }
        },
        metadata: {
            domain: 'procedural',
            created: new Date().toISOString()
        },
        capabilities: [
            {
                name: 'execute',
                handler: function(context) {
                    const lit = context.lit;
                    if (lit.content.currentStep >= lit.content.steps.length) {
                        return { status: 'completed', message: 'All steps completed' };
                    }

                    const step = lit.content.steps[lit.content.currentStep];
                    lit.content.currentStep++;
                    lit.content.metadata.completedSteps++;

                    return {
                        status: 'executing',
                        step: step,
                        progress: (lit.content.currentStep / lit.content.steps.length) * 100
                    };
                }
            },
            {
                name: 'reset',
                handler: function(context) {
                    const lit = context.lit;
                    lit.content.currentStep = 0;
                    lit.content.metadata.completedSteps = 0;
                    lit.content.status = 'ready';
                    return { status: 'reset' };
                }
            }
        ]
    });
}

// Example 3: A Creative LIT
// This LIT generates novel outputs through combinatorial agency
function createCreativeLIT(medium, style, parameters) {
    return composer.compose({
        type: 'creative',
        content: {
            medium,
            style,
            parameters,
            outputs: [],
            id: `creative-${medium}-${style}`.toLowerCase().replace(/\s+/g, '-'),
            persistent: true,
            value: 0
        },
        metadata: {
            domain: 'generative',
            created: new Date().toISOString()
        },
        capabilities: [
            {
                name: 'generate',
                handler: function(context) {
                    const lit = context.lit;
                    const seed = context.seed || Date.now();

                    // Simple generative process
                    const output = {
                        id: `output-${seed}`,
                        timestamp: Date.now(),
                        content: `${style} ${medium} generated with seed ${seed}`,
                        parameters: lit.content.parameters
                    };

                    lit.content.outputs.push(output);
                    lit.content.value += 0.1;

                    return output;
                }
            },
            {
                name: 'evolve',
                handler: function(context) {
                    const lit = context.lit;
                    const mutation = context.mutation || 0.1;

                    // Evolve the parameters
                    Object.keys(lit.content.parameters).forEach(key => {
                        if (typeof lit.content.parameters[key] === 'number') {
                            lit.content.parameters[key] *= (1 + (Math.random() - 0.5) * mutation);
                        }
                    });

                    return { evolved: true, newParameters: lit.content.parameters };
                }
            }
        ]
    });
}

// Example 4: A Prediction LIT
// This LIT makes predictions and updates based on outcomes
function createPredictionLIT(domain, model) {
    return composer.compose({
        type: 'prediction',
        content: {
            domain,
            model,
            predictions: [],
            accuracy: 0,
            id: `prediction-${domain.toLowerCase().replace(/\s+/g, '-')}`,
            persistent: true,
            relations: [],
            metadata: {
                totalPredictions: 0,
                correctPredictions: 0
            }
        },
        metadata: {
            domain: 'forecasting',
            created: new Date().toISOString()
        },
        capabilities: [
            {
                name: 'predict',
                handler: function(context) {
                    const lit = context.lit;
                    const input = context.input;

                    const prediction = {
                        id: `pred-${Date.now()}`,
                        input,
                        output: Math.random(), // Simplified prediction
                        confidence: 0.5 + Math.random() * 0.5,
                        timestamp: Date.now(),
                        verified: false
                    };

                    lit.content.predictions.push(prediction);
                    lit.content.metadata.totalPredictions++;

                    return prediction;
                }
            },
            {
                name: 'verify',
                handler: function(context) {
                    const lit = context.lit;
                    const predictionId = context.predictionId;
                    const actualOutcome = context.outcome;

                    const prediction = lit.content.predictions.find(p => p.id === predictionId);
                    if (!prediction) {
                        return { error: 'Prediction not found' };
                    }

                    prediction.verified = true;
                    prediction.actualOutcome = actualOutcome;
                    prediction.error = Math.abs(prediction.output - actualOutcome);

                    if (prediction.error < 0.1) {
                        lit.content.metadata.correctPredictions++;
                    }

                    lit.content.accuracy = lit.content.metadata.correctPredictions / lit.content.metadata.totalPredictions;

                    return { verified: true, accuracy: lit.content.accuracy };
                }
            }
        ]
    });
}

// Example 5: A Symphonia-type LIT (inspired by the project in the HTML)
function createSymphoniaLIT() {
    return composer.compose({
        type: 'generative-music',
        content: {
            name: 'Symphonia',
            description: 'A generative music LIT that analyzes the real-time harmonic flow of the X1 network',
            harmonicState: {
                frequency: 432,
                phase: 0,
                amplitude: 1.0,
                waveform: 'sine'
            },
            compositions: [],
            id: 'symphonia-prime',
            persistent: true,
            value: 75000,
            metadata: {
                networkedNodes: 0,
                totalCompositions: 0
            }
        },
        metadata: {
            domain: 'generative-music',
            created: new Date().toISOString(),
            project: 'Symphonia',
            status: 'active'
        },
        capabilities: [
            {
                name: 'analyzeNetwork',
                handler: function(context) {
                    const lit = context.lit;
                    const networkState = context.networkState || {};

                    // Analyze X1 network harmonics
                    lit.content.harmonicState.frequency = 432 + (Math.random() - 0.5) * 20;
                    lit.content.harmonicState.phase = (lit.content.harmonicState.phase + Math.PI / 4) % (2 * Math.PI);

                    return { analyzed: true, state: lit.content.harmonicState };
                }
            },
            {
                name: 'compose',
                handler: function(context) {
                    const lit = context.lit;

                    const composition = {
                        id: `comp-${Date.now()}`,
                        timestamp: Date.now(),
                        harmonics: { ...lit.content.harmonicState },
                        duration: 60 + Math.random() * 240, // 1-5 minutes
                        coherenceScore: 0.7 + Math.random() * 0.3
                    };

                    lit.content.compositions.push(composition);
                    lit.content.metadata.totalCompositions++;

                    return composition;
                }
            }
        ]
    });
}

// Create a demonstration network of LITs
function createDemoNetwork() {
    // Create various LITs
    const knowledge1 = createKnowledgeLIT(
        'Xenial Quantum Economics',
        'The XQE is an economy that emerges from the creation, interaction, and transformation of LITs. It operates on principles of coherence, agency, and temporal persistence rather than traditional scarcity-based value.'
    );

    const knowledge2 = createKnowledgeLIT(
        'Coherence Theory',
        'Coherence in information systems is measured by internal consistency, resonance with substrate, and optimal entropy. High coherence enables stable transmission and meaningful transformation.'
    );

    const process1 = createProcessLIT(
        'LIT Manifestation',
        [
            'Conception: Define the core meaning',
            'Composition: Structure the information',
            'Activation: Instantiate agential capabilities',
            'Validation: Measure coherence and temporal signature',
            'Deployment: Release into XQE substrate'
        ]
    );

    const creative1 = createCreativeLIT(
        'visual art',
        'quantum-organic',
        { complexity: 0.7, vibrance: 0.8, recursion: 3 }
    );

    const prediction1 = createPredictionLIT(
        'XQE Patterns',
        'temporal-coherence-model'
    );

    const symphonia = createSymphoniaLIT();

    // Create relations
    knowledge1.relate(knowledge2, 'supports');
    knowledge2.relate(process1, 'informs');
    process1.relate(creative1, 'enables');
    creative1.relate(symphonia, 'inspires');
    prediction1.relate(knowledge1, 'analyzes');

    return {
        knowledge: [knowledge1, knowledge2],
        process: [process1],
        creative: [creative1, symphonia],
        prediction: [prediction1],
        all: [knowledge1, knowledge2, process1, creative1, prediction1, symphonia]
    };
}

// Demonstration function to show LIT interactions
function demonstrateLITs() {
    console.log('=== LIT Framework Demonstration ===\n');

    const network = createDemoNetwork();

    console.log('Created LIT Network:');
    network.all.forEach(lit => {
        console.log(`- ${lit.id}: ${lit.type} (value: ${lit.calculateValue().toFixed(3)}, state: ${lit.state})`);
    });

    console.log('\n--- Interacting with Process LIT ---');
    const processLit = network.process[0];
    console.log(`Process: ${processLit.content.name}`);

    for (let i = 0; i < 3; i++) {
        const result = processLit.agentSystem.executeCapability('execute', { lit: processLit });
        console.log(`Step ${i + 1}:`, result);
        processLit.interact('execute', { impact: 0.2 });
    }

    console.log('\n--- Generating with Creative LIT ---');
    const creativeLit = network.creative[0];
    for (let i = 0; i < 2; i++) {
        const output = creativeLit.agentSystem.executeCapability('generate', {
            lit: creativeLit,
            seed: Date.now() + i
        });
        console.log(`Generated:`, output);
        creativeLit.interact('generate', { impact: 0.3 });
    }

    console.log('\n--- Making Predictions ---');
    const predLit = network.prediction[0];
    const pred = predLit.agentSystem.executeCapability('predict', {
        lit: predLit,
        input: 'future-coherence'
    });
    console.log('Prediction:', pred);

    console.log('\n--- Network Coherence ---');
    console.log(`Overall network coherence: ${composer.measureNetworkCoherence().toFixed(3)}`);

    console.log('\n--- LIT Values After Interaction ---');
    network.all.forEach(lit => {
        console.log(`${lit.id}: ${lit.calculateValue().toFixed(3)} (${lit.state})`);
    });

    return network;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createKnowledgeLIT,
        createProcessLIT,
        createCreativeLIT,
        createPredictionLIT,
        createSymphoniaLIT,
        createDemoNetwork,
        demonstrateLITs
    };
}
