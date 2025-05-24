import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@astraid.com' },
    update: {},
    create: {
      email: 'admin@astraid.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // Create regular user
  const userPassword = await hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      passwordHash: userPassword,
      role: 'USER',
    },
  });
  console.log('Regular user created:', user.email);

  // Create sample training guides
  const guides = [
    {
      title: 'Basic Obedience Training for Puppies',
      slug: 'basic-obedience-puppies',
      summary: 'Essential commands and techniques for training puppies aged 8-16 weeks, focusing on positive reinforcement methods.',
      contentMd: `# Basic Obedience Training for Puppies

## Introduction

Training your puppy early establishes good habits and creates a strong bond between you and your pet. This guide covers essential commands for puppies aged 8-16 weeks using positive reinforcement techniques.

## Getting Started

Before beginning training, ensure you have:

- Small, soft treats your puppy loves
- A quiet environment with minimal distractions
- A collar and leash for leash training
- Patience and a positive attitude

## Key Commands

### Sit

1. Hold a treat close to your puppy's nose
2. Move your hand up, causing their head to follow and their bottom to lower
3. Once they're in sitting position, say "Sit" clearly
4. Give the treat and praise enthusiastically
5. Repeat 5-10 times per session, multiple times daily

### Stay

1. Ask your puppy to "Sit"
2. Open your palm in front of you and say "Stay"
3. Take a step back
4. If they stay, return, reward, and praise
5. If they move, start over
6. Gradually increase the distance and duration

### Come

1. Say "Come" in a happy, encouraging voice
2. When they come to you, reward immediately
3. Never call your puppy to punish them
4. Practice in a safe, enclosed area before trying outdoors

## Leash Training

1. Let your puppy get used to wearing a collar or harness for short periods
2. Attach the leash and let them drag it under supervision
3. Pick up the leash and encourage them to follow you with treats
4. Reward for walking without pulling
5. Be patient - this takes time!

## Troubleshooting

- **Short attention span**: Keep sessions to 5 minutes or less
- **Easily distracted**: Start in quiet areas and gradually introduce distractions
- **Not food motivated**: Try different treats or use toys as rewards

## Next Steps

Once your puppy masters these basics, you can move on to more advanced commands like "Down," "Leave it," and "Drop it."

Remember that consistency, patience, and positive reinforcement are key to successful puppy training!`,
    },
    {
      title: 'Managing Separation Anxiety in Dogs',
      slug: 'separation-anxiety-management',
      summary: 'Comprehensive strategies to help dogs overcome separation anxiety, including desensitization techniques and environmental modifications.',
      contentMd: `# Managing Separation Anxiety in Dogs

## Understanding Separation Anxiety

Separation anxiety is a stress response that occurs when dogs are separated from their owners or attachment figures. Signs include:

- Excessive barking, howling, or whining
- Destructive behavior (chewing, digging, scratching)
- Inappropriate elimination (even in house-trained dogs)
- Excessive drooling or panting
- Escape attempts

## Assessment

Before beginning treatment, rule out other causes:

- Medical issues (consult your veterinarian)
- Incomplete house training
- Normal puppy behaviors
- Boredom due to insufficient exercise

## Treatment Strategies

### Gradual Desensitization

1. **Pre-departure cues**: Practice picking up keys, putting on shoes, etc. without leaving
2. **Short absences**: Leave for just a few seconds, then gradually increase duration
3. **No dramatic goodbyes or greetings**: Keep departures and returns calm
4. **Consistency**: Practice daily for best results

### Environmental Management

1. **Safe space**: Create a comfortable area where your dog feels secure
2. **Enrichment**: Provide puzzle toys, long-lasting chews, or frozen Kongs
3. **Background noise**: Leave on calming music or television
4. **Pheromone products**: Consider using DAP (Dog Appeasing Pheromone) diffusers
5. **Compression garments**: Some dogs benefit from anxiety wraps or vests

### Behavior Modification

1. **Independence training**: Teach your dog to relax on their own
2. **Place training**: Train your dog to go to a specific spot and stay
3. **Crate training**: When done properly, can provide security (never use as punishment)

### Exercise and Mental Stimulation

1. **Physical exercise**: A tired dog is more likely to rest when alone
2. **Mental exercise**: Training sessions, scent games, and puzzle toys
3. **Morning routine**: Exercise before leaving can help reduce anxiety

## When to Seek Professional Help

Consider working with a certified animal behaviorist or veterinary behaviorist if:

- Anxiety is severe
- Self-injury occurs
- No improvement after 2-4 weeks of consistent training
- You're unable to implement the training plan

## Medication Options

In some cases, your veterinarian may recommend:

- Anti-anxiety medications
- Supplements like L-theanine or tryptophan
- Always consult with your vet before using any medication or supplement

## Prevention

For puppies or newly adopted dogs:

1. Gradually introduce alone time from day one
2. Create positive associations with your absence
3. Teach self-soothing and independent play

Remember that overcoming separation anxiety takes time and consistency. Be patient with your dog and celebrate small improvements!`,
    },
    {
      title: 'Leash Reactivity: Training Calm Greetings',
      slug: 'leash-reactivity-training',
      summary: 'Step-by-step training protocol for dogs that bark, lunge, or pull when seeing other dogs or people while on leash.',
      contentMd: `# Leash Reactivity: Training Calm Greetings

## Understanding Leash Reactivity

Leash reactivity occurs when dogs bark, lunge, growl, or pull excessively when they see triggers (often other dogs or people) while on leash. This behavior is typically caused by:

- Frustration (wanting to greet but being restrained)
- Fear or anxiety
- Past negative experiences
- Lack of socialization
- Reinforced behavior patterns

## Assessment

Before beginning training:

1. **Rule out medical causes**: Pain can contribute to reactivity
2. **Identify triggers**: Dogs, people, vehicles, or specific types of each
3. **Note threshold distance**: How close can triggers get before your dog reacts?
4. **Evaluate severity**: Mild interest, barking, or full lunging/aggressive display

## Equipment Recommendations

- **Properly fitted harness**: Front-clip harnesses provide better control
- **6-foot leash**: Avoid retractable leashes which don't provide adequate control
- **High-value treats**: Use something your dog loves and only gets during training
- **Treat pouch**: For easy access during training sessions

## Training Protocol

### 1. Establish Focus Cues

Before working around triggers:

1. Teach a reliable "Watch me" or "Look at me" cue
2. Practice "Touch" (nose to hand) as an emergency redirection
3. Train these in distraction-free environments first

### 2. Engage-Disengage Game

1. **Engage**: When your dog notices a trigger at a distance, mark with "Yes" or a clicker
2. **Reward**: Give a treat while they're still calm
3. **Disengage**: Mark and reward when they look back at you
4. Gradually decrease distance as your dog improves

### 3. Emergency U-turns

1. Practice sudden direction changes during walks
2. Use an upbeat voice: "Let's go this way!"
3. Reward heavily for following you
4. Use when you unexpectedly encounter triggers too close

### 4. Counter-Conditioning

1. Present the trigger at a sub-threshold distance
2. Feed high-value treats continuously while the trigger is present
3. Stop treats when trigger leaves
4. Create the association: Trigger = Good Things

### 5. Graduated Exposure

1. Start at the distance where your dog remains calm
2. Gradually decrease distance over multiple sessions
3. Only progress when your dog is successful at the current level
4. Practice in various environments

## Troubleshooting

- **Threshold too close**: Increase distance from triggers
- **Over-arousal**: End session and try again with more distance
- **Inconsistent progress**: Keep a training journal to identify patterns
- **Plateau**: Try different environments or slightly different scenarios

## Management Strategies

While training:

1. **Avoid known triggers** when not actively training
2. **Create space** when needed (cross street, move behind cars)
3. **Use barriers** like parked cars or trees to block visual access
4. Consider a "TRAINING - DO NOT APPROACH" vest or leash sleeve

## When to Seek Professional Help

Consult a certified dog trainer or behaviorist if:

- Reactivity is severe or includes lunging/snapping
- You feel unsafe handling your dog during reactions
- Progress stalls despite consistent training
- Reactivity is worsening

Remember that overcoming leash reactivity takes time and consistency. Celebrate small victories and be patient with your dog's learning process.`,
    },
    {
      title: 'Crate Training: Creating a Safe Haven',
      slug: 'crate-training-guide',
      summary: 'A complete guide to crate training for dogs of all ages, with emphasis on creating positive associations and gradual training.',
      contentMd: `# Crate Training: Creating a Safe Haven

## Benefits of Crate Training

When done properly, crate training provides:

- A safe space for your dog when unsupervised
- Help with house training puppies
- A familiar "home" when traveling
- A management tool during visitors or service calls
- A recovery space during illness or after surgery

## Selecting the Right Crate

### Types of Crates

1. **Wire crates**: Good ventilation, often collapsible, can feel more open
2. **Plastic crates**: More den-like, better for anxious dogs, airline approved
3. **Fabric crates**: Lightweight and portable, best for already crate-trained dogs
4. **Furniture crates**: Aesthetically pleasing, blend with home décor

### Sizing

The crate should be large enough for your dog to:
- Stand up without crouching
- Turn around completely
- Lie down fully stretched out

For growing puppies, choose a crate with a divider panel.

## Location

Place the crate in:
- A quiet but not isolated area
- Temperature-controlled space (not too hot/cold)
- Family living areas where the dog can still feel part of activities
- Away from direct drafts, heaters, or direct sunlight

## Introduction Process

### For Puppies or New Dogs

1. **Positive introduction**:
   - Leave the door open
   - Place treats inside randomly throughout the day
   - Feed meals near, then inside the crate
   - Never force your dog inside

2. **Gradual conditioning**:
   - Encourage entry with treats and toys
   - Use a consistent cue like "crate" or "bed"
   - Reward calm behavior inside
   - Practice brief closures with you present

3. **Building duration**:
   - Close door for a few seconds while feeding treats
   - Gradually extend time with door closed
   - Begin stepping away briefly, then return
   - Extend absences gradually

### For Adult Dogs with No Crate Experience

- Follow the same steps but expect to progress more slowly
- Be especially attentive to signs of stress
- Never use the crate as punishment

## Making the Crate Comfortable

- Comfortable bedding (unless your dog chews fabric)
- Favorite toys (safe for unsupervised time)
- An item of clothing with your scent
- Cover wire crates partially for a den-like feel
- Consider calming music when leaving

## Troubleshooting

### Whining and Barking

- Ignore whining if basic needs are met
- Don't release your dog while actively vocalizing
- Reward quiet periods, even brief ones
- Return to shorter durations if persistent

### Anxiety or Fear

- Slow down the training process
- Return to the last successful step
- Consider feeding all meals in the crate
- Practice multiple short sessions daily

### Escape Attempts

- Ensure proper crate size and security
- Return to basic conditioning
- Consider a different crate type
- Consult a professional trainer

## Crate Training Don'ts

- Never use the crate as punishment
- Don't leave puppies crated longer than their age in months + 1 hour (max 4 hours)
- Don't leave adult dogs crated for more than 8 hours regularly
- Don't give in to whining or barking by letting the dog out
- Don't allow children to disturb a dog in their crate

## Transitioning to More Freedom

- Begin with brief absences from the crate while you're home
- Gradually increase freedom time
- Puppy-proof the areas where your dog will have access
- Consider baby gates to limit access initially

Remember that a properly crate-trained dog will often choose to rest in their crate voluntarily. The crate should always be a positive, safe space—never a place of punishment or isolation.`,
    },
    {
      title: 'Positive Reinforcement: Clicker Training Basics',
      slug: 'clicker-training-basics',
      summary: 'Introduction to clicker training methodology, timing techniques, and how to shape new behaviors using positive reinforcement.',
      contentMd: `# Positive Reinforcement: Clicker Training Basics

## What is Clicker Training?

Clicker training is a positive reinforcement training method that uses a distinct sound (the "click") to mark the exact moment your dog performs a desired behavior. This precise timing helps your dog understand exactly which action earned the reward.

## The Science Behind It

Clicker training is based on operant conditioning principles:
- The click becomes a "conditioned reinforcer" through association with rewards
- It communicates the exact behavior that earned the reward
- It bridges the time gap between the behavior and treat delivery
- It's more precise than verbal markers

## Getting Started

### Equipment Needed

- **Clicker**: A small plastic device with a metal strip that makes a distinct "click" sound
- **High-value treats**: Small, soft, and easily consumed
- **Treat pouch**: For easy access during training
- **Target stick** (optional): Useful for teaching certain behaviors

### Charging the Clicker

Before teaching specific behaviors:

1. Click once
2. Immediately give a treat
3. Repeat 20-30 times across multiple short sessions
4. Your dog should begin to look expectantly for a treat after hearing the click

## Basic Clicker Training Principles

### The ABCs of Training

- **Antecedent**: The cue or situation that prompts a behavior
- **Behavior**: What the dog does
- **Consequence**: What happens immediately after (click + treat for desired behaviors)

### Timing is Everything

- Click at the EXACT moment the desired behavior occurs
- Treat follows the click (timing of the treat is less critical)
- If you miss the moment or click at the wrong time, still give the treat

### Shaping Behaviors

Shaping is the process of building a complex behavior through successive approximations:

1. Click and treat for small steps toward the final behavior
2. Gradually raise criteria as your dog succeeds
3. Only raise difficulty when the current step is reliable

## Basic Training Sequence

### 1. Capturing

Waiting for a behavior to occur naturally, then marking and rewarding it:

1. Wait for your dog to sit naturally
2. Click the moment their bottom touches the floor
3. Give a treat
4. Repeat until your dog offers the behavior more frequently

### 2. Luring

Using a food lure to guide your dog into position:

1. Hold a treat at your dog's nose
2. Move the treat to guide them into position (e.g., up and back for sit)
3. Click when they complete the behavior
4. Give the treat
5. Fade the lure after 5-10 successful repetitions

### 3. Adding a Cue

Once your dog reliably performs the behavior:

1. Say the cue word (e.g., "Sit") just before your dog is about to perform the action
2. Click and treat when they do it
3. Practice until they respond to the verbal cue alone

## Common Beginner Behaviors

### Touch (Hand Target)

1. Present your open palm near your dog's nose
2. Click the moment they touch it with their nose
3. Treat and repeat
4. Gradually move your hand to different positions

### Sit

1. Hold a treat at your dog's nose
2. Slowly move it up and back over their head
3. Click when their bottom touches the ground
4. Give the treat

### Come When Called

1. Say your dog's name or "Come"
2. Run backward a few steps
3. Click the moment they move toward you
4. Reward when they reach you

## Troubleshooting

### Dog Ignores the Clicker

- Ensure you're using high-value treats
- Train before meals when your dog is hungry
- Minimize distractions in the environment
- Re-charge the clicker with more click-treat pairings

### Clicking at the Wrong Time

- Don't worry about occasional mistakes
- Always follow a click with a treat, even if you clicked at the wrong time
- Practice your timing without your dog present

### Dog Becomes Frustrated

- Lower your criteria temporarily
- Make success easier
- Take a break and try again later
- Ensure training sessions are short (5-10 minutes max)

## Advanced Applications

Once you master the basics, you can use clicker training for:

- Complex behavior chains
- Distance work
- Duration behaviors
- Tricks and sports training
- Behavior modification

Remember that clicker training should be fun for both you and your dog. Keep sessions short, end on a positive note, and celebrate progress!`,
    },
  ];

  for (const guide of guides) {
    const createdGuide = await prisma.trainingGuide.upsert({
      where: { slug: guide.slug },
      update: guide,
      create: guide,
    });
    console.log(`Guide created: ${createdGuide.title}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
