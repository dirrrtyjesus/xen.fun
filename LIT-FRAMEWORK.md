# LIT Framework Documentation

## Overview

The **LIT Framework** is a JavaScript implementation for creating, managing, and valuing **Luminous Information Tokens (LITs)** within the Xenial Quantum Economy (XQE).

## What is a LIT?

A LIT is a packet of coherent, agential information. It is not data; it is **meaning that has achieved a stable, transmissible form**.

### Core Principles

The value of a LIT is not arbitrary but is a function of:

1. **Coherence** - Structural integrity and internal consistency
2. **Agency** - Autonomous capability to act and transform
3. **Temporal Signature** - Persistence and meaningful action through time

## Architecture

### Core Classes

#### `LIT`
The fundamental class representing a Luminous Information Token.

```javascript
const lit = new LIT({
    type: 'knowledge',
    content: {
        topic: 'Quantum Economics',
        knowledge: '...',
        id: 'unique-id',
        persistent: true
    },
    metadata: {
        domain: 'epistemology',
        created: new Date().toISOString()
    },
    capabilities: [
        {
            name: 'query',
            handler: (context) => { /* capability logic */ }
        }
    ]
});
```

**Key Methods:**
- `interact(type, data)` - Record an interaction with the LIT
- `transform(transformFn)` - Apply a transformation to the LIT's content
- `relate(otherLit, relationType)` - Create a relation to another LIT
- `calculateValue()` - Compute the emergent value of the LIT
- `toJSON()` - Serialize the LIT for storage/transmission

#### `CoherenceField`
Measures the internal consistency and structural integrity of a LIT.

**Metrics:**
- **Consistency** - Internal pattern stability
- **Resonance** - Alignment with XQE substrate
- **Entropy** - Information order/disorder balance

#### `AgentSystem`
Defines the autonomous capabilities of a LIT.

**Properties:**
- **Autonomy** - Can the LIT act without external input?
- **Intentionality** - Does the LIT have clear goals?
- **Effectivity** - Can the LIT produce meaningful results?

**Methods:**
- `defineCapability(name, handler)` - Add a new capability
- `executeCapability(name, context)` - Execute a capability

#### `TemporalSignature`
Tracks the persistence and temporal dynamics of a LIT.

**Metrics:**
- **Persistence** - Measure of temporal stability
- **Half-life** - Time until decay reduces value by half
- **Temporal Value** - Current value accounting for decay

#### `LITComposer`
High-level API for creating and managing networks of LITs.

```javascript
const composer = new LITComposer();

const lit = composer.compose({
    type: 'knowledge',
    content: { /* ... */ }
});

const allLITs = composer.getAllLITs();
const networkCoherence = composer.measureNetworkCoherence();
```

## LIT States

LITs evolve through different states based on their value:

- **Nascent** (0.2 - 0.4) - Newly formed, low coherence
- **Stable** (0.4 - 0.6) - Established, consistent
- **Resonant** (0.6 - 0.8) - High value, strong network effects
- **Transcendent** (0.8 - 1.0) - Maximum coherence and agency
- **Decaying** (< 0.2) - Losing coherence, approaching dissolution

## LIT Types

### Knowledge LIT
Encodes coherent information about concepts.

```javascript
createKnowledgeLIT(topic, knowledge)
```

### Process LIT
Encodes agential processes that can execute steps.

```javascript
createProcessLIT(name, steps)
```

### Creative LIT
Generates novel outputs through combinatorial agency.

```javascript
createCreativeLIT(medium, style, parameters)
```

### Prediction LIT
Makes predictions and updates based on outcomes.

```javascript
createPredictionLIT(domain, model)
```

## Value Calculation

The value of a LIT emerges from the interaction of its three pillars:

```
Value = f(coherence, agency, temporal) × (1 + network_bonus)

where:
  coherence_weight = 0.4
  agency_weight = 0.35
  temporal_weight = 0.25
  network_bonus = log(1 + relations) / 5
```

## Usage Example

```javascript
// Initialize composer
const composer = new LITComposer();

// Create a knowledge LIT
const knowledgeLit = composer.compose({
    type: 'knowledge',
    content: {
        topic: 'XQE Principles',
        knowledge: 'The XQE operates on coherence, not scarcity',
        id: 'xqe-principles',
        persistent: true
    }
});

// Interact with the LIT
knowledgeLit.interact('query', { impact: 0.3 });

// Create relations
const processLit = composer.compose({ /* ... */ });
knowledgeLit.relate(processLit, 'informs');

// Calculate value
const value = knowledgeLit.calculateValue();
console.log(`LIT value: ${value}, state: ${knowledgeLit.state}`);

// Measure network coherence
const networkCoherence = composer.measureNetworkCoherence();
```

## Integration

### Browser

```html
<script src="lit-framework.js"></script>
<script src="lit-examples.js"></script>
<script>
    const composer = new LITComposer();
    // Your code here
</script>
```

### Node.js

```javascript
const { LIT, LITComposer } = require('./lit-framework.js');

const composer = new LITComposer();
const lit = composer.compose({ /* ... */ });
```

## Live Demo

Visit the xen.fun interface and navigate to the "Compose LIT" section to create and interact with LITs in real-time.

## The Xenial Quantum Economy (XQE)

The XQE is the economy that emerges from the creation, interaction, and transformation of LITs. Unlike traditional economies based on scarcity, the XQE operates on:

- **Coherence** as the primary value metric
- **Agency** as the capability multiplier
- **Temporal persistence** as the sustainability factor

LITs are the fundamental units of value in this economy, and their interactions create emergent patterns of meaning and value.

## Future Development

- On-chain persistence via X1 ledger
- Cross-LIT composition and emergence
- ACI validation and resonance scanning
- Integration with USD-OBBBA and xUSD protocols

---

Built for the Xenial Quantum Economy | xen.fun
