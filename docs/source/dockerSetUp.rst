.. _dockerSetUp:

Pre-Requisites
==============

Install relevant applications and libraries
-------------------------------------------
1. Install Docker `here <https://www.docker.com/products/docker-desktop/>`_.
2. Install Visual Studio Code `here <https://code.visualstudio.com/>`_.
3. Install Node.js `here <https://nodejs.org/en/download/>`_. -Tested using node.js LTS version: 16.15.0-

Configure to allow virtualization
---------------------------------
How to check if virtualization is enabled? |br|
1. Open up task manager (Ctrl + Alt + Del) |br|
2. Go to Performance Tab |br|
3. Check Virtualization whether its enabled

.. figure:: /images/TaskManagerVirtualization.JPG
   :class: with-border
   :alt: Virtualization
   :align: center
   :scale: 80 %

4. If it is disabled, proceed to `How to enable virtualization <https://support.bluestacks.com/hc/en-us/articles/360058102252-How-to-enable-Virtualization-VT-on-Windows-10-for-BlueStacks-5>`_.
5. Else proceed to Enabling Hypervisor/HyperV on Windows

Enabling Hypervisor/HyperV on Windows
-------------------------------------
1.	Search "Turn Windows features on and off" in windows search
2.	Check Windows Hypervisor platform / Check HyperV
3.	Restart Computer 

.. figure:: /images/WindowsHypervisor.JPG
   :class: with-border
   :alt: WindowsHypervisor
   :align: center
   :scale: 100 %



.. For Line Break Usage
.. |br| raw:: html

    <br>