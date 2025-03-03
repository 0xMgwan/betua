'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import AIStrategyDashboard from '../components/strategy/AIStrategyDashboard';
import StrategyPerformance from '../components/strategy/StrategyPerformance';
import StrategyOptimizer from '../components/strategy/StrategyOptimizer';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function StrategyPage() {
  const tabs = [
    { name: 'AI Strategies', component: AIStrategyDashboard },
    { name: 'Performance', component: StrategyPerformance },
    { name: 'Optimizer', component: StrategyOptimizer }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Strategy Hub</h1>
          <p className="mt-2 text-gray-600">
            Leverage AI-powered strategies to optimize your betting performance
          </p>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            {tabs.map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                )}
              >
                <tab.component />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
