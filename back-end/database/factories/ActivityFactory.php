<?php

namespace Database\Factories;

use App\Models\Strategy;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(), // Generate a UUID for the activity
            'activity_name' => $this->faker->sentence(3), // Random activity name
            'responsible' => $this->faker->name(), // Random name for the responsible person
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed', 'cancelled']), // Random status
            'description' => $this->faker->paragraph(), // Random description
            'category' => $this->faker->randomElement(['education','engagement', 'advocacy']), // Random category
            'activity_note' => $this->faker->text(100), // Random note
            'strategy_id' => Strategy::factory(), // Associate with a Strategy, create one if necessary
        ];
    }
}
