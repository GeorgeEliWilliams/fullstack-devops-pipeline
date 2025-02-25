<?php

namespace Database\Factories;

use App\Models\StrategiesStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Strategy;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StrategiesStatusHistory>
 */
class StrategiesStatusHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'strategy_id' => $this->faker->randomElement(Strategy::pluck('id')->toArray()), // Use existing Strategy ID
            'status_id' => $this->faker->randomElement(StrategiesStatus::pluck('id')->toArray()),      // Creates a new Status or use existing Status ID
            'updated_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'updated_by' => $this->faker->optional()->name,
        ];
    }
}
