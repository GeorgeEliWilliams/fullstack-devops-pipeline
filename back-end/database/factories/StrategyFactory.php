<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Issue;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Strategy>
 */
class StrategyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            //
            'id' => $this->faker->uuid,
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'responsible' => $this->faker->name(),
            'level' => $this->faker->randomElement(['community', 'facility', 'district', 'national']),
            'deadline' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d H:i:s'),
            'budget' => $this->faker->numberBetween(1000, 100000),
            'objective' => $this->faker->text(),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed', 'delayed', 'dropped']),
            'created_at' => now(),
            'updated_at' => now(),
            'issue_id' => Issue::inRandomOrder()->first()->id ?? Issue::factory()->create()->id,
        ];
    }
}
