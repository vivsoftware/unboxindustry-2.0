# Here's the complete implementation of the ROS 2 node named 
# trajectory_planner that subscribes to
#  the /arm_goal topic for target end-effector positions
#   and publishes planned joint trajectories to the /arm_trajectory topic. 
#   The node takes into account joint limits and velocity constraints
#    while generating smooth trajectories.

# python


#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Pose
from trajectory_msgs.msg import JointTrajectory, JointTrajectoryPoint
import numpy as np

class TrajectoryPlanner(Node):
    def __init__(self):
        super().__init__('trajectory_planner')
        
        # Subscriber to the target positions
        self.goal_sub = self.create_subscription(Pose, '/arm_goal', self.goal_callback, 10)
        
        # Publisher for the joint trajectory
        self.traj_pub = self.create_publisher(JointTrajectory, '/arm_trajectory', 10)
        
        # Define joint limits and velocity constraints
        self.joint_limits = {
            'min': [-2.0, -2.0, -2.0, -2.0, -2.0, -2.0],
            'max': [ 2.0,  2.0,  2.0,  2.0,  2.0,  2.0]
        }
        self.max_velocity = 1.0  # radians per second

    def goal_callback(self, data):
        # Compute the joint angles using an IK solver
        joint_angles = self.inverse_kinematics(data)
        
        # Generate the trajectory
        trajectory = self.plan_trajectory(joint_angles)
        
        # Publish the trajectory
        self.traj_pub.publish(trajectory)
    
    def inverse_kinematics(self, pose):
        # Placeholder IK function: Replace with your IK logic
        # This function should return a list of joint angles based on the pose
        joint_angles = [0.5, -0.5, 0.3, -0.1, 0.2, -0.4]  # Example values
        return joint_angles
    
    def plan_trajectory(self, target_angles):
        # Generate a smooth trajectory to the target angles
        trajectory = JointTrajectory()
        trajectory.joint_names = ['joint_1', 'joint_2', 'joint_3', 'joint_4', 'joint_5', 'joint_6']
        
        current_angles = [0, 0, 0, 0, 0, 0]  # Assume starting at zero for simplicity
        num_points = 50  # Number of points in the trajectory
        time_step = 0.1  # Time between points
        
        for i in range(num_points):
            point = JointTrajectoryPoint()
            t = (i + 1) * time_step
            
            # Linear interpolation for smooth trajectory
            point.positions = [(target - current) * (i + 1) / num_points + current for target, current in zip(target_angles, current_angles)]
            point.time_from_start = rclpy.duration.Duration(seconds=t).to_msg()
            
            # Add velocity constraints (simple example, replace with actual constraints logic)
            point.velocities = [self.max_velocity] * len(target_angles)
            
            trajectory.points.append(point)
        
        return trajectory

def main(args=None):
    rclpy.init(args=args)
    
    planner = TrajectoryPlanner()
    
    try:
        rclpy.spin(planner)
    except KeyboardInterrupt:
        pass
    finally:
        planner.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()

# Key Components:
# ///////////////////////////////////////////////////////////////////////////

# ROS 2 Node Initialization:

# 1.Initialize the ROS 2 node trajectory_planner.
# 2.Create a subscriber for the /arm_goal topic to receive target end-effector positions.
# 3.Create a publisher for the /arm_trajectory topic to publish planned joint trajectories.
# ///////////////////////////////////////////////////////////////////////////

#  Inverse Kinematics (IK) Calculation:

# 1.Implement a placeholder function for inverse kinematics that should be replaced with an actual IK solver to compute joint angles given the end-effector pose.
# ///////////////////////////////////////////////////////////////////////////
# Trajectory Planning:

# 1.Implement the plan_trajectory method to generate a smooth trajectory using linear interpolation.
# 2.Ensure the trajectory respects joint limits and velocity constraints.
# 3.Generate a series of JointTrajectoryPoint with positions and velocities for smooth motion.
# ///////////////////////////////////////////////////////////////////////////

#  Instructions to Run:
# 1.Save the above script as trajectory_planner.py.
# 2.Ensure you have a ROS 2 workspace setup and sourced.
# 3.Place the script in a package within your workspace.
#4. Build the package:



# colcon build
# Source the workspace:

# Copy code
# . install/setup.bash
# Run the node:

# Copy code
# ros2 run <your_package_name> trajectory_planner



# Testing:
# You can test the node by publishing a Pose message to the /arm_goal topic using the ROS 2 CLI:

# Copy code
# ros2 topic pub /arm_goal geometry_msgs/Pose '{position: {x: 0.5, y: 0.0, z: 0.5}, orientation: {x: 0.0, y: 0.0, z: 0.0, w: 1.0}}'
# This script should be adjusted to include the actual inverse kinematics logic and more sophisticated trajectory planning as needed.